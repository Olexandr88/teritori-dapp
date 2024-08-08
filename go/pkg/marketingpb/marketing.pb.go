// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        (unknown)
// source: marketing/v1/marketing.proto

package marketingpb

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type MarketingCollectionPreview struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id                  string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	ImageUri            string `protobuf:"bytes,2,opt,name=image_uri,json=imageUri,proto3" json:"image_uri,omitempty"`
	CollectionName      string `protobuf:"bytes,3,opt,name=collection_name,json=collectionName,proto3" json:"collection_name,omitempty"`
	CreatorName         string `protobuf:"bytes,4,opt,name=creator_name,json=creatorName,proto3" json:"creator_name,omitempty"`
	TwitterUrl          string `protobuf:"bytes,5,opt,name=twitter_url,json=twitterUrl,proto3" json:"twitter_url,omitempty"`
	SecondaryDuringMint bool   `protobuf:"varint,6,opt,name=secondary_during_mint,json=secondaryDuringMint,proto3" json:"secondary_during_mint,omitempty"`
}

func (x *MarketingCollectionPreview) Reset() {
	*x = MarketingCollectionPreview{}
	if protoimpl.UnsafeEnabled {
		mi := &file_marketing_v1_marketing_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MarketingCollectionPreview) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MarketingCollectionPreview) ProtoMessage() {}

func (x *MarketingCollectionPreview) ProtoReflect() protoreflect.Message {
	mi := &file_marketing_v1_marketing_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MarketingCollectionPreview.ProtoReflect.Descriptor instead.
func (*MarketingCollectionPreview) Descriptor() ([]byte, []int) {
	return file_marketing_v1_marketing_proto_rawDescGZIP(), []int{0}
}

func (x *MarketingCollectionPreview) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *MarketingCollectionPreview) GetImageUri() string {
	if x != nil {
		return x.ImageUri
	}
	return ""
}

func (x *MarketingCollectionPreview) GetCollectionName() string {
	if x != nil {
		return x.CollectionName
	}
	return ""
}

func (x *MarketingCollectionPreview) GetCreatorName() string {
	if x != nil {
		return x.CreatorName
	}
	return ""
}

func (x *MarketingCollectionPreview) GetTwitterUrl() string {
	if x != nil {
		return x.TwitterUrl
	}
	return ""
}

func (x *MarketingCollectionPreview) GetSecondaryDuringMint() bool {
	if x != nil {
		return x.SecondaryDuringMint
	}
	return false
}

type Action struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Label string `protobuf:"bytes,1,opt,name=label,proto3" json:"label,omitempty"`
	Url   string `protobuf:"bytes,2,opt,name=url,proto3" json:"url,omitempty"`
}

func (x *Action) Reset() {
	*x = Action{}
	if protoimpl.UnsafeEnabled {
		mi := &file_marketing_v1_marketing_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Action) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Action) ProtoMessage() {}

func (x *Action) ProtoReflect() protoreflect.Message {
	mi := &file_marketing_v1_marketing_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Action.ProtoReflect.Descriptor instead.
func (*Action) Descriptor() ([]byte, []int) {
	return file_marketing_v1_marketing_proto_rawDescGZIP(), []int{1}
}

func (x *Action) GetLabel() string {
	if x != nil {
		return x.Label
	}
	return ""
}

func (x *Action) GetUrl() string {
	if x != nil {
		return x.Url
	}
	return ""
}

type News struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Title    string    `protobuf:"bytes,1,opt,name=title,proto3" json:"title,omitempty"`
	Subtitle string    `protobuf:"bytes,2,opt,name=subtitle,proto3" json:"subtitle,omitempty"`
	Text     string    `protobuf:"bytes,3,opt,name=text,proto3" json:"text,omitempty"`
	Image    string    `protobuf:"bytes,4,opt,name=image,proto3" json:"image,omitempty"`
	Actions  []*Action `protobuf:"bytes,5,rep,name=actions,proto3" json:"actions,omitempty"`
}

func (x *News) Reset() {
	*x = News{}
	if protoimpl.UnsafeEnabled {
		mi := &file_marketing_v1_marketing_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *News) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*News) ProtoMessage() {}

func (x *News) ProtoReflect() protoreflect.Message {
	mi := &file_marketing_v1_marketing_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use News.ProtoReflect.Descriptor instead.
func (*News) Descriptor() ([]byte, []int) {
	return file_marketing_v1_marketing_proto_rawDescGZIP(), []int{2}
}

func (x *News) GetTitle() string {
	if x != nil {
		return x.Title
	}
	return ""
}

func (x *News) GetSubtitle() string {
	if x != nil {
		return x.Subtitle
	}
	return ""
}

func (x *News) GetText() string {
	if x != nil {
		return x.Text
	}
	return ""
}

func (x *News) GetImage() string {
	if x != nil {
		return x.Image
	}
	return ""
}

func (x *News) GetActions() []*Action {
	if x != nil {
		return x.Actions
	}
	return nil
}

type Banner struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Image string `protobuf:"bytes,1,opt,name=image,proto3" json:"image,omitempty"`
	Url   string `protobuf:"bytes,2,opt,name=url,proto3" json:"url,omitempty"`
}

func (x *Banner) Reset() {
	*x = Banner{}
	if protoimpl.UnsafeEnabled {
		mi := &file_marketing_v1_marketing_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Banner) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Banner) ProtoMessage() {}

func (x *Banner) ProtoReflect() protoreflect.Message {
	mi := &file_marketing_v1_marketing_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Banner.ProtoReflect.Descriptor instead.
func (*Banner) Descriptor() ([]byte, []int) {
	return file_marketing_v1_marketing_proto_rawDescGZIP(), []int{3}
}

func (x *Banner) GetImage() string {
	if x != nil {
		return x.Image
	}
	return ""
}

func (x *Banner) GetUrl() string {
	if x != nil {
		return x.Url
	}
	return ""
}

type NewsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Testnet bool `protobuf:"varint,1,opt,name=testnet,proto3" json:"testnet,omitempty"`
}

func (x *NewsRequest) Reset() {
	*x = NewsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_marketing_v1_marketing_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *NewsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*NewsRequest) ProtoMessage() {}

func (x *NewsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_marketing_v1_marketing_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use NewsRequest.ProtoReflect.Descriptor instead.
func (*NewsRequest) Descriptor() ([]byte, []int) {
	return file_marketing_v1_marketing_proto_rawDescGZIP(), []int{4}
}

func (x *NewsRequest) GetTestnet() bool {
	if x != nil {
		return x.Testnet
	}
	return false
}

type NewsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	News []*News `protobuf:"bytes,1,rep,name=news,proto3" json:"news,omitempty"`
}

func (x *NewsResponse) Reset() {
	*x = NewsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_marketing_v1_marketing_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *NewsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*NewsResponse) ProtoMessage() {}

func (x *NewsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_marketing_v1_marketing_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use NewsResponse.ProtoReflect.Descriptor instead.
func (*NewsResponse) Descriptor() ([]byte, []int) {
	return file_marketing_v1_marketing_proto_rawDescGZIP(), []int{5}
}

func (x *NewsResponse) GetNews() []*News {
	if x != nil {
		return x.News
	}
	return nil
}

type BannersRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Testnet bool `protobuf:"varint,1,opt,name=testnet,proto3" json:"testnet,omitempty"`
}

func (x *BannersRequest) Reset() {
	*x = BannersRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_marketing_v1_marketing_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *BannersRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*BannersRequest) ProtoMessage() {}

func (x *BannersRequest) ProtoReflect() protoreflect.Message {
	mi := &file_marketing_v1_marketing_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use BannersRequest.ProtoReflect.Descriptor instead.
func (*BannersRequest) Descriptor() ([]byte, []int) {
	return file_marketing_v1_marketing_proto_rawDescGZIP(), []int{6}
}

func (x *BannersRequest) GetTestnet() bool {
	if x != nil {
		return x.Testnet
	}
	return false
}

type BannersResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Banners []*Banner `protobuf:"bytes,1,rep,name=banners,proto3" json:"banners,omitempty"`
}

func (x *BannersResponse) Reset() {
	*x = BannersResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_marketing_v1_marketing_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *BannersResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*BannersResponse) ProtoMessage() {}

func (x *BannersResponse) ProtoReflect() protoreflect.Message {
	mi := &file_marketing_v1_marketing_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use BannersResponse.ProtoReflect.Descriptor instead.
func (*BannersResponse) Descriptor() ([]byte, []int) {
	return file_marketing_v1_marketing_proto_rawDescGZIP(), []int{7}
}

func (x *BannersResponse) GetBanners() []*Banner {
	if x != nil {
		return x.Banners
	}
	return nil
}

type LiveCollectionsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	NetworkId string `protobuf:"bytes,1,opt,name=network_id,json=networkId,proto3" json:"network_id,omitempty"`
}

func (x *LiveCollectionsRequest) Reset() {
	*x = LiveCollectionsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_marketing_v1_marketing_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LiveCollectionsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LiveCollectionsRequest) ProtoMessage() {}

func (x *LiveCollectionsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_marketing_v1_marketing_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LiveCollectionsRequest.ProtoReflect.Descriptor instead.
func (*LiveCollectionsRequest) Descriptor() ([]byte, []int) {
	return file_marketing_v1_marketing_proto_rawDescGZIP(), []int{8}
}

func (x *LiveCollectionsRequest) GetNetworkId() string {
	if x != nil {
		return x.NetworkId
	}
	return ""
}

type LiveCollectionsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Collections []*MarketingCollectionPreview `protobuf:"bytes,1,rep,name=collections,proto3" json:"collections,omitempty"`
}

func (x *LiveCollectionsResponse) Reset() {
	*x = LiveCollectionsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_marketing_v1_marketing_proto_msgTypes[9]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LiveCollectionsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LiveCollectionsResponse) ProtoMessage() {}

func (x *LiveCollectionsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_marketing_v1_marketing_proto_msgTypes[9]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LiveCollectionsResponse.ProtoReflect.Descriptor instead.
func (*LiveCollectionsResponse) Descriptor() ([]byte, []int) {
	return file_marketing_v1_marketing_proto_rawDescGZIP(), []int{9}
}

func (x *LiveCollectionsResponse) GetCollections() []*MarketingCollectionPreview {
	if x != nil {
		return x.Collections
	}
	return nil
}

type UpcomingCollectionsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	NetworkId string `protobuf:"bytes,1,opt,name=network_id,json=networkId,proto3" json:"network_id,omitempty"`
}

func (x *UpcomingCollectionsRequest) Reset() {
	*x = UpcomingCollectionsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_marketing_v1_marketing_proto_msgTypes[10]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UpcomingCollectionsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UpcomingCollectionsRequest) ProtoMessage() {}

func (x *UpcomingCollectionsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_marketing_v1_marketing_proto_msgTypes[10]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UpcomingCollectionsRequest.ProtoReflect.Descriptor instead.
func (*UpcomingCollectionsRequest) Descriptor() ([]byte, []int) {
	return file_marketing_v1_marketing_proto_rawDescGZIP(), []int{10}
}

func (x *UpcomingCollectionsRequest) GetNetworkId() string {
	if x != nil {
		return x.NetworkId
	}
	return ""
}

type UpcomingCollectionsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Collections []*MarketingCollectionPreview `protobuf:"bytes,1,rep,name=collections,proto3" json:"collections,omitempty"`
}

func (x *UpcomingCollectionsResponse) Reset() {
	*x = UpcomingCollectionsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_marketing_v1_marketing_proto_msgTypes[11]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UpcomingCollectionsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UpcomingCollectionsResponse) ProtoMessage() {}

func (x *UpcomingCollectionsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_marketing_v1_marketing_proto_msgTypes[11]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UpcomingCollectionsResponse.ProtoReflect.Descriptor instead.
func (*UpcomingCollectionsResponse) Descriptor() ([]byte, []int) {
	return file_marketing_v1_marketing_proto_rawDescGZIP(), []int{11}
}

func (x *UpcomingCollectionsResponse) GetCollections() []*MarketingCollectionPreview {
	if x != nil {
		return x.Collections
	}
	return nil
}

var File_marketing_v1_marketing_proto protoreflect.FileDescriptor

var file_marketing_v1_marketing_proto_rawDesc = []byte{
	0x0a, 0x1c, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x2f, 0x76, 0x31, 0x2f, 0x6d,
	0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0c,
	0x6d, 0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x2e, 0x76, 0x31, 0x22, 0xea, 0x01, 0x0a,
	0x1a, 0x4d, 0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x43, 0x6f, 0x6c, 0x6c, 0x65, 0x63,
	0x74, 0x69, 0x6f, 0x6e, 0x50, 0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x12, 0x0e, 0x0a, 0x02, 0x69,
	0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x1b, 0x0a, 0x09, 0x69,
	0x6d, 0x61, 0x67, 0x65, 0x5f, 0x75, 0x72, 0x69, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08,
	0x69, 0x6d, 0x61, 0x67, 0x65, 0x55, 0x72, 0x69, 0x12, 0x27, 0x0a, 0x0f, 0x63, 0x6f, 0x6c, 0x6c,
	0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x0e, 0x63, 0x6f, 0x6c, 0x6c, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x4e, 0x61, 0x6d,
	0x65, 0x12, 0x21, 0x0a, 0x0c, 0x63, 0x72, 0x65, 0x61, 0x74, 0x6f, 0x72, 0x5f, 0x6e, 0x61, 0x6d,
	0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x63, 0x72, 0x65, 0x61, 0x74, 0x6f, 0x72,
	0x4e, 0x61, 0x6d, 0x65, 0x12, 0x1f, 0x0a, 0x0b, 0x74, 0x77, 0x69, 0x74, 0x74, 0x65, 0x72, 0x5f,
	0x75, 0x72, 0x6c, 0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0a, 0x74, 0x77, 0x69, 0x74, 0x74,
	0x65, 0x72, 0x55, 0x72, 0x6c, 0x12, 0x32, 0x0a, 0x15, 0x73, 0x65, 0x63, 0x6f, 0x6e, 0x64, 0x61,
	0x72, 0x79, 0x5f, 0x64, 0x75, 0x72, 0x69, 0x6e, 0x67, 0x5f, 0x6d, 0x69, 0x6e, 0x74, 0x18, 0x06,
	0x20, 0x01, 0x28, 0x08, 0x52, 0x13, 0x73, 0x65, 0x63, 0x6f, 0x6e, 0x64, 0x61, 0x72, 0x79, 0x44,
	0x75, 0x72, 0x69, 0x6e, 0x67, 0x4d, 0x69, 0x6e, 0x74, 0x22, 0x30, 0x0a, 0x06, 0x41, 0x63, 0x74,
	0x69, 0x6f, 0x6e, 0x12, 0x14, 0x0a, 0x05, 0x6c, 0x61, 0x62, 0x65, 0x6c, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x05, 0x6c, 0x61, 0x62, 0x65, 0x6c, 0x12, 0x10, 0x0a, 0x03, 0x75, 0x72, 0x6c,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x75, 0x72, 0x6c, 0x22, 0x92, 0x01, 0x0a, 0x04,
	0x4e, 0x65, 0x77, 0x73, 0x12, 0x14, 0x0a, 0x05, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x05, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x73, 0x75,
	0x62, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x73, 0x75,
	0x62, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x74, 0x65, 0x78, 0x74, 0x18, 0x03,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x74, 0x65, 0x78, 0x74, 0x12, 0x14, 0x0a, 0x05, 0x69, 0x6d,
	0x61, 0x67, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x69, 0x6d, 0x61, 0x67, 0x65,
	0x12, 0x2e, 0x0a, 0x07, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x18, 0x05, 0x20, 0x03, 0x28,
	0x0b, 0x32, 0x14, 0x2e, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x2e, 0x76, 0x31,
	0x2e, 0x41, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x52, 0x07, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x73,
	0x22, 0x30, 0x0a, 0x06, 0x42, 0x61, 0x6e, 0x6e, 0x65, 0x72, 0x12, 0x14, 0x0a, 0x05, 0x69, 0x6d,
	0x61, 0x67, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x69, 0x6d, 0x61, 0x67, 0x65,
	0x12, 0x10, 0x0a, 0x03, 0x75, 0x72, 0x6c, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x75,
	0x72, 0x6c, 0x22, 0x27, 0x0a, 0x0b, 0x4e, 0x65, 0x77, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x12, 0x18, 0x0a, 0x07, 0x74, 0x65, 0x73, 0x74, 0x6e, 0x65, 0x74, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x08, 0x52, 0x07, 0x74, 0x65, 0x73, 0x74, 0x6e, 0x65, 0x74, 0x22, 0x36, 0x0a, 0x0c, 0x4e,
	0x65, 0x77, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x26, 0x0a, 0x04, 0x6e,
	0x65, 0x77, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x6d, 0x61, 0x72, 0x6b,
	0x65, 0x74, 0x69, 0x6e, 0x67, 0x2e, 0x76, 0x31, 0x2e, 0x4e, 0x65, 0x77, 0x73, 0x52, 0x04, 0x6e,
	0x65, 0x77, 0x73, 0x22, 0x2a, 0x0a, 0x0e, 0x42, 0x61, 0x6e, 0x6e, 0x65, 0x72, 0x73, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x18, 0x0a, 0x07, 0x74, 0x65, 0x73, 0x74, 0x6e, 0x65, 0x74,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x08, 0x52, 0x07, 0x74, 0x65, 0x73, 0x74, 0x6e, 0x65, 0x74, 0x22,
	0x41, 0x0a, 0x0f, 0x42, 0x61, 0x6e, 0x6e, 0x65, 0x72, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x12, 0x2e, 0x0a, 0x07, 0x62, 0x61, 0x6e, 0x6e, 0x65, 0x72, 0x73, 0x18, 0x01, 0x20,
	0x03, 0x28, 0x0b, 0x32, 0x14, 0x2e, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x2e,
	0x76, 0x31, 0x2e, 0x42, 0x61, 0x6e, 0x6e, 0x65, 0x72, 0x52, 0x07, 0x62, 0x61, 0x6e, 0x6e, 0x65,
	0x72, 0x73, 0x22, 0x37, 0x0a, 0x16, 0x4c, 0x69, 0x76, 0x65, 0x43, 0x6f, 0x6c, 0x6c, 0x65, 0x63,
	0x74, 0x69, 0x6f, 0x6e, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1d, 0x0a, 0x0a,
	0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x09, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x49, 0x64, 0x22, 0x65, 0x0a, 0x17, 0x4c,
	0x69, 0x76, 0x65, 0x43, 0x6f, 0x6c, 0x6c, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x4a, 0x0a, 0x0b, 0x63, 0x6f, 0x6c, 0x6c, 0x65, 0x63,
	0x74, 0x69, 0x6f, 0x6e, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x28, 0x2e, 0x6d, 0x61,
	0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x2e, 0x76, 0x31, 0x2e, 0x4d, 0x61, 0x72, 0x6b, 0x65,
	0x74, 0x69, 0x6e, 0x67, 0x43, 0x6f, 0x6c, 0x6c, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x50, 0x72,
	0x65, 0x76, 0x69, 0x65, 0x77, 0x52, 0x0b, 0x63, 0x6f, 0x6c, 0x6c, 0x65, 0x63, 0x74, 0x69, 0x6f,
	0x6e, 0x73, 0x22, 0x3b, 0x0a, 0x1a, 0x55, 0x70, 0x63, 0x6f, 0x6d, 0x69, 0x6e, 0x67, 0x43, 0x6f,
	0x6c, 0x6c, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x12, 0x1d, 0x0a, 0x0a, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x5f, 0x69, 0x64, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x49, 0x64, 0x22,
	0x69, 0x0a, 0x1b, 0x55, 0x70, 0x63, 0x6f, 0x6d, 0x69, 0x6e, 0x67, 0x43, 0x6f, 0x6c, 0x6c, 0x65,
	0x63, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x4a,
	0x0a, 0x0b, 0x63, 0x6f, 0x6c, 0x6c, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x18, 0x01, 0x20,
	0x03, 0x28, 0x0b, 0x32, 0x28, 0x2e, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x2e,
	0x76, 0x31, 0x2e, 0x4d, 0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x43, 0x6f, 0x6c, 0x6c,
	0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x50, 0x72, 0x65, 0x76, 0x69, 0x65, 0x77, 0x52, 0x0b, 0x63,
	0x6f, 0x6c, 0x6c, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x32, 0x9d, 0x02, 0x0a, 0x10, 0x4d,
	0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12,
	0x3d, 0x0a, 0x04, 0x4e, 0x65, 0x77, 0x73, 0x12, 0x19, 0x2e, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x74,
	0x69, 0x6e, 0x67, 0x2e, 0x76, 0x31, 0x2e, 0x4e, 0x65, 0x77, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x1a, 0x2e, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x2e, 0x76,
	0x31, 0x2e, 0x4e, 0x65, 0x77, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x5e,
	0x0a, 0x0f, 0x4c, 0x69, 0x76, 0x65, 0x43, 0x6f, 0x6c, 0x6c, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e,
	0x73, 0x12, 0x24, 0x2e, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x2e, 0x76, 0x31,
	0x2e, 0x4c, 0x69, 0x76, 0x65, 0x43, 0x6f, 0x6c, 0x6c, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x73,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x25, 0x2e, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x74,
	0x69, 0x6e, 0x67, 0x2e, 0x76, 0x31, 0x2e, 0x4c, 0x69, 0x76, 0x65, 0x43, 0x6f, 0x6c, 0x6c, 0x65,
	0x63, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x6a,
	0x0a, 0x13, 0x55, 0x70, 0x63, 0x6f, 0x6d, 0x69, 0x6e, 0x67, 0x43, 0x6f, 0x6c, 0x6c, 0x65, 0x63,
	0x74, 0x69, 0x6f, 0x6e, 0x73, 0x12, 0x28, 0x2e, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e,
	0x67, 0x2e, 0x76, 0x31, 0x2e, 0x55, 0x70, 0x63, 0x6f, 0x6d, 0x69, 0x6e, 0x67, 0x43, 0x6f, 0x6c,
	0x6c, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a,
	0x29, 0x2e, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x2e, 0x76, 0x31, 0x2e, 0x55,
	0x70, 0x63, 0x6f, 0x6d, 0x69, 0x6e, 0x67, 0x43, 0x6f, 0x6c, 0x6c, 0x65, 0x63, 0x74, 0x69, 0x6f,
	0x6e, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0x0f, 0x5a, 0x0d, 0x2e, 0x2f,
	0x6d, 0x61, 0x72, 0x6b, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x70, 0x62, 0x62, 0x06, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x33,
}

var (
	file_marketing_v1_marketing_proto_rawDescOnce sync.Once
	file_marketing_v1_marketing_proto_rawDescData = file_marketing_v1_marketing_proto_rawDesc
)

func file_marketing_v1_marketing_proto_rawDescGZIP() []byte {
	file_marketing_v1_marketing_proto_rawDescOnce.Do(func() {
		file_marketing_v1_marketing_proto_rawDescData = protoimpl.X.CompressGZIP(file_marketing_v1_marketing_proto_rawDescData)
	})
	return file_marketing_v1_marketing_proto_rawDescData
}

var file_marketing_v1_marketing_proto_msgTypes = make([]protoimpl.MessageInfo, 12)
var file_marketing_v1_marketing_proto_goTypes = []interface{}{
	(*MarketingCollectionPreview)(nil),  // 0: marketing.v1.MarketingCollectionPreview
	(*Action)(nil),                      // 1: marketing.v1.Action
	(*News)(nil),                        // 2: marketing.v1.News
	(*Banner)(nil),                      // 3: marketing.v1.Banner
	(*NewsRequest)(nil),                 // 4: marketing.v1.NewsRequest
	(*NewsResponse)(nil),                // 5: marketing.v1.NewsResponse
	(*BannersRequest)(nil),              // 6: marketing.v1.BannersRequest
	(*BannersResponse)(nil),             // 7: marketing.v1.BannersResponse
	(*LiveCollectionsRequest)(nil),      // 8: marketing.v1.LiveCollectionsRequest
	(*LiveCollectionsResponse)(nil),     // 9: marketing.v1.LiveCollectionsResponse
	(*UpcomingCollectionsRequest)(nil),  // 10: marketing.v1.UpcomingCollectionsRequest
	(*UpcomingCollectionsResponse)(nil), // 11: marketing.v1.UpcomingCollectionsResponse
}
var file_marketing_v1_marketing_proto_depIdxs = []int32{
	1,  // 0: marketing.v1.News.actions:type_name -> marketing.v1.Action
	2,  // 1: marketing.v1.NewsResponse.news:type_name -> marketing.v1.News
	3,  // 2: marketing.v1.BannersResponse.banners:type_name -> marketing.v1.Banner
	0,  // 3: marketing.v1.LiveCollectionsResponse.collections:type_name -> marketing.v1.MarketingCollectionPreview
	0,  // 4: marketing.v1.UpcomingCollectionsResponse.collections:type_name -> marketing.v1.MarketingCollectionPreview
	4,  // 5: marketing.v1.MarketingService.News:input_type -> marketing.v1.NewsRequest
	8,  // 6: marketing.v1.MarketingService.LiveCollections:input_type -> marketing.v1.LiveCollectionsRequest
	10, // 7: marketing.v1.MarketingService.UpcomingCollections:input_type -> marketing.v1.UpcomingCollectionsRequest
	5,  // 8: marketing.v1.MarketingService.News:output_type -> marketing.v1.NewsResponse
	9,  // 9: marketing.v1.MarketingService.LiveCollections:output_type -> marketing.v1.LiveCollectionsResponse
	11, // 10: marketing.v1.MarketingService.UpcomingCollections:output_type -> marketing.v1.UpcomingCollectionsResponse
	8,  // [8:11] is the sub-list for method output_type
	5,  // [5:8] is the sub-list for method input_type
	5,  // [5:5] is the sub-list for extension type_name
	5,  // [5:5] is the sub-list for extension extendee
	0,  // [0:5] is the sub-list for field type_name
}

func init() { file_marketing_v1_marketing_proto_init() }
func file_marketing_v1_marketing_proto_init() {
	if File_marketing_v1_marketing_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_marketing_v1_marketing_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MarketingCollectionPreview); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_marketing_v1_marketing_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Action); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_marketing_v1_marketing_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*News); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_marketing_v1_marketing_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Banner); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_marketing_v1_marketing_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*NewsRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_marketing_v1_marketing_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*NewsResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_marketing_v1_marketing_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*BannersRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_marketing_v1_marketing_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*BannersResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_marketing_v1_marketing_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LiveCollectionsRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_marketing_v1_marketing_proto_msgTypes[9].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LiveCollectionsResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_marketing_v1_marketing_proto_msgTypes[10].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UpcomingCollectionsRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_marketing_v1_marketing_proto_msgTypes[11].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UpcomingCollectionsResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_marketing_v1_marketing_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   12,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_marketing_v1_marketing_proto_goTypes,
		DependencyIndexes: file_marketing_v1_marketing_proto_depIdxs,
		MessageInfos:      file_marketing_v1_marketing_proto_msgTypes,
	}.Build()
	File_marketing_v1_marketing_proto = out.File
	file_marketing_v1_marketing_proto_rawDesc = nil
	file_marketing_v1_marketing_proto_goTypes = nil
	file_marketing_v1_marketing_proto_depIdxs = nil
}
