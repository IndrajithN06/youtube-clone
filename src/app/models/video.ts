// src/app/models/video.model.ts
export class Video {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    uploadDate: Date;
    userId: number;
  
    // Constructor (optional)
    constructor(
      id: number,
      title: string,
      description: string,
      thumbnailUrl: string,
      videoUrl: string,
      uploadDate: Date,
      userId: number
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.thumbnailUrl = thumbnailUrl;
      this.videoUrl = videoUrl;
      this.uploadDate = uploadDate;
      this.userId = userId;
    }
  }
  