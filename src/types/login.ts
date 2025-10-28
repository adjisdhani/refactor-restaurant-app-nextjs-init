import type { FormEvent } from "react";

export interface AuthFormProps {
  username: string;
  password: string;
  setUsername: (v: string) => void;
  setPassword: (v: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error?: string;
  loading?: boolean;
  LoadingComponent?: React.ComponentType<{ dynamicMessage: string }> | null;
  dynamicMessage: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
}