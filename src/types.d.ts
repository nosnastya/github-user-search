type User = {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
};

type UserState = {
    users: User[];
    isLoading: boolean;
};
