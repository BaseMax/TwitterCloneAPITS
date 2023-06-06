export type TweetInit = {
  id: number;
  user: {
    id: number;
    username: string;
  };
  content: string;
};
