type User = {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    type: Entities.User
};

type Repository = {
    id: number;
    full_name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    owner: User;
    type: Entities.Repository
};

type UserState = {
    users: User[];
    isLoading: boolean;
    isResolved: boolean;
};

type RepositoryState = {
    repositories: Repository[];
    isLoading: boolean;
    isResolved: boolean;
};

type EntityValue = Entities.User | Entities.User;

type Option<T extends EntityValue> = {
    label: string;
    value: T;
};
