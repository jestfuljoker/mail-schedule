import { DeepPartial, ObjectLiteral } from "typeorm";

export type ModelProps<T> = { [key in keyof T]?: T[key] };

export abstract class GenericRepository<T extends ObjectLiteral> {
	abstract save(model: T): Promise<T>;

	/**
	 * Creates new entities and copies all entity properties from given objects into their new entities.
	 * Note that it copies only properties that are present in entity schema.
	 */
	abstract create(entityLikeArray: DeepPartial<T>[]): T[];
	/**
	 * Creates a new entity instance and copies all entity properties from this object into a new entity.
	 * Note that it copies only properties that are present in entity schema.
	 */
	abstract create(entityLike?: DeepPartial<T>): T;
	abstract create(entityLike?: DeepPartial<T> | DeepPartial<T>[]): T | T[];
}
