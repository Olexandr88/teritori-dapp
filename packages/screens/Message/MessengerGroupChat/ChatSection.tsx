import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";

import { ChatHeader } from "./ChatHeader";
import { Conversation } from "./Conversation";
import plus from "../../../../assets/icons/chatplus.svg";
import sent from "../../../../assets/icons/sent.svg";
import { BrandText } from "../../../components/BrandText";
import { Dropdown } from "../../../components/Dropdown";
import { SVG } from "../../../components/SVG";
import { Separator } from "../../../components/Separator";
import { TextInputCustom } from "../../../components/inputs/TextInputCustom";
import { SpacerColumn, SpacerRow } from "../../../components/spacer";
import { useFeedbacks } from "../../../context/FeedbacksProvider";
import { selectMessageListByGroupPk } from "../../../store/slices/message";
import { neutral00, neutral33, redDefault } from "../../../utils/style/colors";
import { fontSemibold10, fontSemibold12 } from "../../../utils/style/fonts";
import { layout } from "../../../utils/style/layout";
import {
  Conversation as IConversation,
  Message,
  ReplyTo,
} from "../../../utils/types/message";
import { GroupInfo_Reply } from "../../../weshnet";
import { weshClient } from "../../../weshnet/client";
import { sendMessage } from "../../../weshnet/client/services";
import {
  subscribeMessages,
  subscribeMetadata,
} from "../../../weshnet/client/subscribers";
import {
  bytesFromString,
  stringFromBytes,
} from "../../../weshnet/client/utils";
import { UploadImage } from "../MessengerHomeCreateChatDropdown/UploadImage";

interface ChatSectionProps {
  conversation: IConversation;
}
export interface HandleSendParams {
  message: string;
  files: Message["payload"]["files"];
}

export const ChatSection = ({ conversation }: ChatSectionProps) => {
  const { width } = useWindowDimensions();
  const [message, setMessage] = useState<any>("");
  const [inputHeight, setInputHeight] = useState(40);
  const [replyTo, setReplyTo] = useState<ReplyTo>();

  const [searchInput, setSearchInput] = useState("");
  const [isFileUploader, setIsFileUploader] = useState(false);

  const { setToastError } = useFeedbacks();
  const [groupInfo, setGroupInfo] = useState<GroupInfo_Reply>();
  const messages = useSelector(
    selectMessageListByGroupPk(stringFromBytes(groupInfo?.group?.publicKey))
  );

  const [subsId, setSubsId] = useState();

  const getGroupInfo = async () => {
    let _group: GroupInfo_Reply;
    let subsId;

    try {
      if (conversation.type === "group") {
        _group = await weshClient().GroupInfo({
          groupPk: bytesFromString(conversation.id),
        });
        await weshClient().ActivateGroup({
          groupPk: _group.group?.publicKey,
        });
      } else {
        _group = await weshClient().GroupInfo({
          contactPk: conversation.members[0].id,
        });
        await weshClient().ActivateGroup({
          groupPk: _group.group?.publicKey,
        });
      }

      setGroupInfo(_group);
      // subsId = await subscribeMessages(
      //  string groupPk: _group.group?.publicKey,

      // );
      // await subscribeMetadata(_group.group?.publicKey);

      setSubsId(subsId);
    } catch (err) {
      setToastError({
        title: "Failed to get group info",
        message: err?.message,
      });
    }
  };

  useEffect(() => {
    getGroupInfo();
    return () => {
      subsId?.unsubscribe();
    };
  }, [conversation.id]);

  const handleSend = async (data?: HandleSendParams) => {
    if (!message && !data?.message) {
      return;
    }
    try {
      await sendMessage({
        groupPk: groupInfo?.group?.publicKey,
        message: {
          type: "message",
          parentId: replyTo?.id || "",
          payload: {
            message: message || data?.message,
            files: data?.files || [],
          },
        },
      });

      setMessage("");
      setReplyTo(undefined);
    } catch (err) {
      setToastError({
        title: "Failed to send message",
        message: err?.message,
      });
    }
  };
  const { height } = useWindowDimensions();

  return (
    <View
      style={{
        height: height - 210,
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <View style={{ zIndex: 11111 }}>
          <ChatHeader
            messages={messages}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            name={conversation.name || "Anon"}
          />
        </View>
        <Separator color={neutral33} />

        <FlatList
          inverted
          data={messages}
          style={{
            paddingVertical: layout.padding_x1_5,
          }}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item, index }) => {
            const previousMessage =
              index < messages.length - 1 ? messages[index + 1] : undefined;
            const nextMessage = index > 0 ? messages[index - 1] : undefined;

            const separatorDate = previousMessage
              ? moment(item.timestamp).format("DD/MM/YYYY") !==
                  moment(previousMessage.timestamp).format("DD/MM/YYYY") &&
                item.timestamp
              : item.timestamp;

            const isNewSeparator = !previousMessage?.isRead && item.isRead;
            return (
              <>
                <Conversation
                  onReply={setReplyTo}
                  message={item}
                  data={item.message}
                  groupPk={groupInfo?.group?.publicKey}
                  height={0}
                  width={0}
                  isMessageChain={previousMessage?.senderId === item.senderId}
                  isNextMine={nextMessage?.senderId === item.senderId}
                />
                {(isNewSeparator || !!separatorDate) && (
                  <View
                    style={{
                      flexDirection: "row",
                      position: "relative",
                      alignItems: "center",
                      justifyContent: "center",
                      marginVertical: layout.padding_x2,
                      width: "80%",
                      alignSelf: "center",
                    }}
                  >
                    {!!separatorDate && (
                      <BrandText
                        style={[
                          fontSemibold10,
                          {
                            backgroundColor: neutral00,
                            paddingHorizontal: layout.padding_x2,
                            zIndex: 9,
                          },
                        ]}
                      >
                        {moment(separatorDate).format("DD/MM/YYYY")}
                      </BrandText>
                    )}

                    {isNewSeparator && (
                      <View
                        style={{
                          backgroundColor: redDefault,
                          paddingVertical: layout.padding_x0_25,
                          paddingHorizontal: layout.padding_x0_5,
                          borderRadius: 2,
                          zIndex: 9,
                          position: "absolute",
                          right: 0,
                        }}
                      >
                        <BrandText style={[fontSemibold10]}>New</BrandText>
                      </View>
                    )}
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: isNewSeparator
                          ? redDefault
                          : neutral33,
                        height: 0.5,
                        position: "absolute",
                        zIndex: 0,
                      }}
                    />
                  </View>
                )}
              </>
            );
          }}
          keyExtractor={(item) => item.id}
        />

        <SpacerColumn size={3} />

        {isFileUploader && (
          <UploadImage
            onClose={() => setIsFileUploader(false)}
            handleSend={handleSend}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: layout.padding_x1,
          alignItems: "center",
        }}
      >
        <Dropdown triggerComponent={<SVG source={plus} />}>
          {() => (
            <UploadImage
              onClose={() => setIsFileUploader(false)}
              handleSend={handleSend}
            />
          )}
        </Dropdown>

        <SpacerRow size={2} />
        <View>
          {!!replyTo?.message && (
            <View
              style={{
                backgroundColor: neutral33,
                padding: layout.padding_x1,
                marginLeft: layout.padding_x3,
                borderRadius: 10,
                maxWidth: 400,
              }}
            >
              <BrandText style={[fontSemibold12, { color: "white" }]}>
                Reply to: {replyTo?.message}
              </BrandText>
            </View>
          )}
          <TextInputCustom
            containerStyle={{
              marginHorizontal: layout.padding_x0_5,
            }}
            height={Math.max(40, inputHeight)}
            name="message"
            placeHolder={
              replyTo?.message ? "Add reply message" : "Add a Message"
            }
            value={message}
            onChangeText={setMessage}
            label=""
            style={{
              width: width - 560,
            }}
            textInputStyle={{
              height: Math.max(20, inputHeight - 20),
            }}
            onSubmitEditing={() => {
              if (message.length) {
                handleSend();
              }
            }}
            onContentSizeChange={(event) => {
              setInputHeight(event.nativeEvent.contentSize.height);
            }}
          >
            <TouchableOpacity onPress={handleSend}>
              <SVG source={sent} />
            </TouchableOpacity>
          </TextInputCustom>
        </View>
      </View>
    </View>
  );
};