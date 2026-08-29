import { TagType } from "../types/tag";
import { readJson , updateJson } from "../lib/json-store";


const filename = 'tag.json';


export class TagRepository {
  async getAll(): Promise<TagType[]> {
    return readJson<TagType[]>(filename, []);
  }
  async getById(id: number): Promise<TagType | undefined> {
    const tags = await this.getAll();
    return tags.find((tag) => tag.value === id);
  }
  async create(data: Omit<TagType, "value">): Promise<TagType> {
    let newTag!: TagType;
    await updateJson<TagType[]>(filename, [], (tags) => {
      newTag = {
        value: tags.length
          ? Math.max(...tags.map((item) => item.value)) + 1
          : 1,
        ...data,
      };
      return [...tags, newTag];
    });
    return newTag;
  }
  async update(
    id: number,
    data: Partial<Omit<TagType, "value">>,
  ): Promise<TagType | null> {
    let updatedTag: TagType | null = null;
    await updateJson<TagType[]>(filename, [], (tags) => {
      const index = tags.findIndex((tag) => tag.value === id);
      if (index !== -1) {
        updatedTag = { ...tags[index], ...data };
        tags[index] = updatedTag;
      }
      return [...tags];
    });
    return updatedTag;
  }
  async delete(id: number): Promise<boolean> {
    let deleted = false;

    await updateJson<TagType[]>(filename, [], (tags) => {
      const index = tags.findIndex((tag) => tag.value === id);
      if (index !== -1) {
        tags.splice(index, 1);
        deleted = true;
      }
      return [...tags];
    });
    return deleted;
  }
  async getByValue(value: number): Promise<TagType | undefined> {
    const tags = await this.getAll();

    return tags.find((tag) => tag.value === value);
  }
}

  export const tagRepository = new TagRepository();