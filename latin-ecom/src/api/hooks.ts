import { useQuery } from '@tanstack/react-query';
import { apiClient } from './client';
import {
  ApiItemResponse,
  ApiListResponse,
  BillingBreakdownItem,
  Connection,
  DashboardResponse,
  Movement,
  Order,
  Product,
  WalletRequest
} from '../utils/types';

export const useDashboard = (params?: { from?: string; to?: string }) =>
  useQuery({
    queryKey: ['dashboard', params],
    queryFn: () => apiClient.get<ApiItemResponse<DashboardResponse>>('/api/dashboard', { query: params }),
    select: (response) => response.data
  });

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.get<ApiListResponse<Product[]>>('/api/products'),
    select: (response) => response.data
  });

export const useOrders = (params?: { status?: string; paymentMethod?: string; search?: string }) =>
  useQuery({
    queryKey: ['orders', params],
    queryFn: () => apiClient.get<ApiListResponse<Order[]>>('/api/orders', { query: params }),
    select: (response) => response.data
  });

export const useMovements = () =>
  useQuery({
    queryKey: ['movements'],
    queryFn: () => apiClient.get<ApiListResponse<Movement[]>>('/api/movements'),
    select: (response) => response.data
  });

export const useWalletRequests = () =>
  useQuery({
    queryKey: ['wallet-requests'],
    queryFn: () => apiClient.get<ApiListResponse<WalletRequest[]>>('/api/wallet-requests'),
    select: (response) => response.data
  });

export const useConnections = () =>
  useQuery({
    queryKey: ['connections'],
    queryFn: () => apiClient.get<ApiListResponse<Connection[]>>('/api/connections'),
    select: (response) => response.data
  });

export const useBillingBreakdown = (params?: { from?: string; to?: string }) =>
  useQuery({
    queryKey: ['billing', params],
    queryFn: () => apiClient.get<ApiListResponse<BillingBreakdownItem[]>>('/api/billing', { query: params }),
    select: (response) => response.data
  });
