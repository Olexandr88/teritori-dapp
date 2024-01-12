import React, { FC, memo } from "react";

import { FeedHeader } from "./components/FeedHeader";
import { PostsRequest } from "../../api/feed/v1/feed";
import { BrandText } from "../../components/BrandText";
import { ScreenContainer } from "../../components/ScreenContainer";
import { MobileTitle } from "../../components/ScreenContainer/ScreenContainerMobile";
import { NewsFeed } from "../../components/socialFeed/NewsFeed/NewsFeed";
import { PostCategory } from "../../components/socialFeed/NewsFeed/NewsFeed.type";
import { useIsMobile } from "../../hooks/useIsMobile";
import { NetworkFeature } from "../../networks";

export const ArticlesFeedScreen: FC = memo(() => {
  const isMobile = useIsMobile();
  const feedRequest: Partial<PostsRequest> = {
    filter: {
      categories: [PostCategory.Article],
      user: "",
      mentions: [],
      hashtags: [],
    },
    limit: 10,
    offset: 0,
  };

  return (
    <ScreenContainer
      fullWidth
      responsive
      noMargin
      noScroll
      footerChildren={<></>}
      forceNetworkFeatures={[NetworkFeature.SocialFeed]}
      headerChildren={<BrandText>Social Feed</BrandText>}
    >
      <NewsFeed
        req={feedRequest}
        Header={() => (
          <>
            {/* ScreenContainer has noScroll, so we need to add MobileTitle here */}
            {isMobile && <MobileTitle title="SOCIAL FEED" />}
            <FeedHeader selectedTab="articles" />
          </>
        )}
      />
    </ScreenContainer>
  );
});