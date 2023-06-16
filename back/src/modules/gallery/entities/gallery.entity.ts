import { randomUUID } from "crypto";

export class Gallery {
  readonly id: string;
  image_url: string;

  constructor() {
    this.id = randomUUID()
  }
}
