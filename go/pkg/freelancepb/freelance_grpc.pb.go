// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             (unknown)
// source: freelance/v1/freelance.proto

package freelancepb

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// FreelanceServiceClient is the client API for FreelanceService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type FreelanceServiceClient interface {
	SellerProfile(ctx context.Context, in *SellerProfileRequest, opts ...grpc.CallOption) (*SellerProfileResponse, error)
	GigList(ctx context.Context, in *GigListRequest, opts ...grpc.CallOption) (*GigListResponse, error)
	GigListUser(ctx context.Context, in *GigListUserRequest, opts ...grpc.CallOption) (*GigListUserResponse, error)
	GigData(ctx context.Context, in *GigDataRequest, opts ...grpc.CallOption) (*GigDataResponse, error)
	EscrowAllList(ctx context.Context, in *EscrowAllListRequest, opts ...grpc.CallOption) (*EscrowAllListResponse, error)
	EscrowSenderList(ctx context.Context, in *EscrowSenderListRequest, opts ...grpc.CallOption) (*EscrowSenderListResponse, error)
	EscrowReceiverList(ctx context.Context, in *EscrowReceiverListRequest, opts ...grpc.CallOption) (*EscrowReceiverListResponse, error)
}

type freelanceServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewFreelanceServiceClient(cc grpc.ClientConnInterface) FreelanceServiceClient {
	return &freelanceServiceClient{cc}
}

func (c *freelanceServiceClient) SellerProfile(ctx context.Context, in *SellerProfileRequest, opts ...grpc.CallOption) (*SellerProfileResponse, error) {
	out := new(SellerProfileResponse)
	err := c.cc.Invoke(ctx, "/freelance.v1.FreelanceService/SellerProfile", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *freelanceServiceClient) GigList(ctx context.Context, in *GigListRequest, opts ...grpc.CallOption) (*GigListResponse, error) {
	out := new(GigListResponse)
	err := c.cc.Invoke(ctx, "/freelance.v1.FreelanceService/GigList", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *freelanceServiceClient) GigListUser(ctx context.Context, in *GigListUserRequest, opts ...grpc.CallOption) (*GigListUserResponse, error) {
	out := new(GigListUserResponse)
	err := c.cc.Invoke(ctx, "/freelance.v1.FreelanceService/GigListUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *freelanceServiceClient) GigData(ctx context.Context, in *GigDataRequest, opts ...grpc.CallOption) (*GigDataResponse, error) {
	out := new(GigDataResponse)
	err := c.cc.Invoke(ctx, "/freelance.v1.FreelanceService/GigData", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *freelanceServiceClient) EscrowAllList(ctx context.Context, in *EscrowAllListRequest, opts ...grpc.CallOption) (*EscrowAllListResponse, error) {
	out := new(EscrowAllListResponse)
	err := c.cc.Invoke(ctx, "/freelance.v1.FreelanceService/EscrowAllList", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *freelanceServiceClient) EscrowSenderList(ctx context.Context, in *EscrowSenderListRequest, opts ...grpc.CallOption) (*EscrowSenderListResponse, error) {
	out := new(EscrowSenderListResponse)
	err := c.cc.Invoke(ctx, "/freelance.v1.FreelanceService/EscrowSenderList", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *freelanceServiceClient) EscrowReceiverList(ctx context.Context, in *EscrowReceiverListRequest, opts ...grpc.CallOption) (*EscrowReceiverListResponse, error) {
	out := new(EscrowReceiverListResponse)
	err := c.cc.Invoke(ctx, "/freelance.v1.FreelanceService/EscrowReceiverList", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// FreelanceServiceServer is the server API for FreelanceService service.
// All implementations must embed UnimplementedFreelanceServiceServer
// for forward compatibility
type FreelanceServiceServer interface {
	SellerProfile(context.Context, *SellerProfileRequest) (*SellerProfileResponse, error)
	GigList(context.Context, *GigListRequest) (*GigListResponse, error)
	GigListUser(context.Context, *GigListUserRequest) (*GigListUserResponse, error)
	GigData(context.Context, *GigDataRequest) (*GigDataResponse, error)
	EscrowAllList(context.Context, *EscrowAllListRequest) (*EscrowAllListResponse, error)
	EscrowSenderList(context.Context, *EscrowSenderListRequest) (*EscrowSenderListResponse, error)
	EscrowReceiverList(context.Context, *EscrowReceiverListRequest) (*EscrowReceiverListResponse, error)
	mustEmbedUnimplementedFreelanceServiceServer()
}

// UnimplementedFreelanceServiceServer must be embedded to have forward compatible implementations.
type UnimplementedFreelanceServiceServer struct {
}

func (UnimplementedFreelanceServiceServer) SellerProfile(context.Context, *SellerProfileRequest) (*SellerProfileResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SellerProfile not implemented")
}
func (UnimplementedFreelanceServiceServer) GigList(context.Context, *GigListRequest) (*GigListResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GigList not implemented")
}
func (UnimplementedFreelanceServiceServer) GigListUser(context.Context, *GigListUserRequest) (*GigListUserResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GigListUser not implemented")
}
func (UnimplementedFreelanceServiceServer) GigData(context.Context, *GigDataRequest) (*GigDataResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GigData not implemented")
}
func (UnimplementedFreelanceServiceServer) EscrowAllList(context.Context, *EscrowAllListRequest) (*EscrowAllListResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method EscrowAllList not implemented")
}
func (UnimplementedFreelanceServiceServer) EscrowSenderList(context.Context, *EscrowSenderListRequest) (*EscrowSenderListResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method EscrowSenderList not implemented")
}
func (UnimplementedFreelanceServiceServer) EscrowReceiverList(context.Context, *EscrowReceiverListRequest) (*EscrowReceiverListResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method EscrowReceiverList not implemented")
}
func (UnimplementedFreelanceServiceServer) mustEmbedUnimplementedFreelanceServiceServer() {}

// UnsafeFreelanceServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to FreelanceServiceServer will
// result in compilation errors.
type UnsafeFreelanceServiceServer interface {
	mustEmbedUnimplementedFreelanceServiceServer()
}

func RegisterFreelanceServiceServer(s grpc.ServiceRegistrar, srv FreelanceServiceServer) {
	s.RegisterService(&FreelanceService_ServiceDesc, srv)
}

func _FreelanceService_SellerProfile_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SellerProfileRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(FreelanceServiceServer).SellerProfile(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/freelance.v1.FreelanceService/SellerProfile",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(FreelanceServiceServer).SellerProfile(ctx, req.(*SellerProfileRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _FreelanceService_GigList_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GigListRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(FreelanceServiceServer).GigList(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/freelance.v1.FreelanceService/GigList",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(FreelanceServiceServer).GigList(ctx, req.(*GigListRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _FreelanceService_GigListUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GigListUserRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(FreelanceServiceServer).GigListUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/freelance.v1.FreelanceService/GigListUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(FreelanceServiceServer).GigListUser(ctx, req.(*GigListUserRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _FreelanceService_GigData_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GigDataRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(FreelanceServiceServer).GigData(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/freelance.v1.FreelanceService/GigData",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(FreelanceServiceServer).GigData(ctx, req.(*GigDataRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _FreelanceService_EscrowAllList_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(EscrowAllListRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(FreelanceServiceServer).EscrowAllList(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/freelance.v1.FreelanceService/EscrowAllList",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(FreelanceServiceServer).EscrowAllList(ctx, req.(*EscrowAllListRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _FreelanceService_EscrowSenderList_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(EscrowSenderListRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(FreelanceServiceServer).EscrowSenderList(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/freelance.v1.FreelanceService/EscrowSenderList",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(FreelanceServiceServer).EscrowSenderList(ctx, req.(*EscrowSenderListRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _FreelanceService_EscrowReceiverList_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(EscrowReceiverListRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(FreelanceServiceServer).EscrowReceiverList(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/freelance.v1.FreelanceService/EscrowReceiverList",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(FreelanceServiceServer).EscrowReceiverList(ctx, req.(*EscrowReceiverListRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// FreelanceService_ServiceDesc is the grpc.ServiceDesc for FreelanceService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var FreelanceService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "freelance.v1.FreelanceService",
	HandlerType: (*FreelanceServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SellerProfile",
			Handler:    _FreelanceService_SellerProfile_Handler,
		},
		{
			MethodName: "GigList",
			Handler:    _FreelanceService_GigList_Handler,
		},
		{
			MethodName: "GigListUser",
			Handler:    _FreelanceService_GigListUser_Handler,
		},
		{
			MethodName: "GigData",
			Handler:    _FreelanceService_GigData_Handler,
		},
		{
			MethodName: "EscrowAllList",
			Handler:    _FreelanceService_EscrowAllList_Handler,
		},
		{
			MethodName: "EscrowSenderList",
			Handler:    _FreelanceService_EscrowSenderList_Handler,
		},
		{
			MethodName: "EscrowReceiverList",
			Handler:    _FreelanceService_EscrowReceiverList_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "freelance/v1/freelance.proto",
}