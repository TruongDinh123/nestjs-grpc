// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v3.20.3
// source: product.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "product";

export enum ProductType {
  CLOTHING = 0,
  ELECTRONICS = 1,
  UNRECOGNIZED = -1,
}

export interface CreateProductRequest {
  name: string;
  thumbnail: string;
  price: number;
  description: string;
  quantity: number;
  productType: string;
  attributes: { [key: string]: string };
}

export interface CreateProductRequest_AttributesEntry {
  key: string;
  value: string;
}

export interface ProductResponse {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
  description: string;
  quantity: number;
  slug: string;
  productType: ProductType;
  attributes: { [key: string]: string };
  ratingAverage: number;
  isPublished: boolean;
}

export interface ProductResponse_AttributesEntry {
  key: string;
  value: string;
}

export const PRODUCT_PACKAGE_NAME = "product";

export interface ProductServiceClient {
  createProduct(request: CreateProductRequest, metadata: Metadata, ...rest: any): Observable<ProductResponse>;
}

export interface ProductServiceController {
  createProduct(
    request: CreateProductRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createProduct"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = "ProductService";