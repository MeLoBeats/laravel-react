export type StateContextType = {
  user: {
    name: ''
  },
  token: string|null,
  setUser?: (user: any) => void
  setToken?: (token: string|null) => void,
  notification?: string,
  setNotification?: any;
}
