export interface ViewProfileDTO {
    viewerId: number;
    profileOwnerId: number;
  }

  export interface ResponseViewDTO {
    message: string;
  }

  export interface ViewDTO {
    name: string;
    id: number;
  }
  
  export interface ProfileViewDTO {
    viewers: ViewDTO[];
    profileOwnerId: number;
  }