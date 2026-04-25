// ============================================================
// The Atelier — API Layer
// Base URL: http://localhost:3001/api
// ============================================================

const BASE_URL = "http://localhost:3001/api";

// ─── Types ──────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: "CUSTOMER" | "BARBER";
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: "CUSTOMER" | "BARBER";
}

export interface Barber {
  id: string;
  userId: string;
  bio?: string;
  specialty?: string;
  imageUrl?: string;
  user: { id: string; name: string; email: string };
  services?: Service[];
  schedules?: Schedule[];
  _count?: { bookings: number };
}

export interface Service {
  id: string;
  barberId: string;
  name: string;
  duration: number;
  price: number;
}

export interface Schedule {
  id: string;
  barberId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "AVAILABLE" | "DISABLED" | "BOOKED";
}

export interface Booking {
  id: string;
  userId: string;
  barberId: string;
  serviceId: string;
  scheduleId: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  notes?: string;
  createdAt: string;
  service: Service;
  schedule: Schedule;
  barber: Barber;
  user?: { id: string; name: string; email: string; phone?: string };
}

export interface CreateBookingData {
  barberId: string;
  serviceId: string;
  scheduleId: string;
  notes?: string;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// ─── Core Fetch Wrapper ─────────────────────────────────────

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch (err) {
    // Only throws on network failure (CORS, DNS, offline)
    throw new ApiError("Unable to connect to the server. Please check your network connection.", 0);
  }

  // 401 Unauthorized globally kicks to login
  if (res.status === 401) {
    if (endpoint === "/auth/login") {
      throw new ApiError("Invalid email or password.", 401);
    }

    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    throw new ApiError("Session expired. Please log in again.", 401);
  }

  // Handle no-content responses (e.g. 204)
  if (res.status === 204) {
    return {} as T;
  }

  let data;
  try {
    data = await res.json();
  } catch (err) {
    if (!res.ok) {
      throw new ApiError("An unexpected server error occurred.", res.status);
    }
    return {} as T;
  }

  if (!res.ok) {
    const message =
      data?.message ||
      (Array.isArray(data?.message) ? data.message.join(", ") : null) ||
      "Something went wrong";
    throw new ApiError(message, res.status);
  }

  return data as T;
}

// ─── Auth ───────────────────────────────────────────────────

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const data = await request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // 🔴 FIX: Persist token in BOTH localStorage and cookies
  if (typeof window !== "undefined") {
    localStorage.setItem("token", data.access_token);
    document.cookie = `token=${data.access_token}; path=/; max-age=86400`; // 1 day
    document.cookie = `role=${data.user.role}; path=/; max-age=86400`;
  }

  return data;
}

export async function register(
  registerData: RegisterData
): Promise<AuthResponse> {
  const data = await request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(registerData),
  });

  // 🔴 FIX: Persist token in BOTH localStorage and cookies
  if (typeof window !== "undefined") {
    localStorage.setItem("token", data.access_token);
    document.cookie = `token=${data.access_token}; path=/; max-age=86400`;
    if (data.user?.role) {
      document.cookie = `role=${data.user.role}; path=/; max-age=86400`;
    }
  }

  return data;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}

export async function getProfile(): Promise<User> {
  return request<User>("/auth/profile");
}

// ─── Barbers ────────────────────────────────────────────────

export async function getBarbers(): Promise<Barber[]> {
  return request<Barber[]>("/barbers");
}

export async function getBarberDetail(id: string): Promise<Barber> {
  return request<Barber>(`/barbers/${id}`);
}

// ─── Services ───────────────────────────────────────────────

export async function getServices(barberId: string): Promise<Service[]> {
  return request<Service[]>(`/services/barber/${barberId}`);
}

// ─── Schedules ──────────────────────────────────────────────

export async function getSchedules(
  barberId: string,
  date?: string
): Promise<Schedule[]> {
  const query = date ? `?date=${date}` : "";
  return request<Schedule[]>(`/schedules/barber/${barberId}${query}`);
}

// ─── Bookings ───────────────────────────────────────────────

export async function createBooking(data: CreateBookingData): Promise<Booking> {
  return request<Booking>("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMyBookings(): Promise<Booking[]> {
  return request<Booking[]>("/bookings/my");
}

export async function getBarberBookings(): Promise<Booking[]> {
  return request<Booking[]>("/bookings/barber");
}

export async function updateBookingStatus(
  id: string,
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
): Promise<Booking> {
  return request<Booking>(`/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function cancelBooking(id: string): Promise<Booking> {
  return request<Booking>(`/bookings/${id}`, {
    method: "DELETE",
  });
}

// ─── Service Management ─────────────────────────────────────
export async function createService(data: { name: string; duration: number; price: number }): Promise<Service> {
  return request<Service>("/services", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ─── Schedule Management ────────────────────────────────────
export async function createSchedule(data: { date: string; startTime: string; endTime: string }): Promise<Schedule> {
  return request<Schedule>("/schedules", {
    method: "POST",
    body: JSON.stringify(data),
  });
}