import { makeClassInstance } from "@/shared/utils/create-class-instance";
import { DeepPartial, ObjectLiteral, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export type ModelProps<T> = { [key in keyof T]?: T[key] };

export abstract class GenericRepository<T extends ObjectLiteral> {
	constructor(private readonly repository: Repository<T>) {}

	async save(model: T): Promise<T> {
		return this.repository.save(model);
	}

	async partialUpdate(id: string, partialEntity: QueryDeepPartialEntity<T>): Promise<void> {
		await this.repository.update(id, partialEntity);
	}

	/**
	 * Creates new entities and copies all entity properties from given objects into their new entities.
	 * Note that it copies only properties that are present in entity schema.
	 */
	create(entityLikeArray: DeepPartial<T>[]): T[];
	/**
	 * Creates a new entity instance and copies all entity properties from this object into a new entity.
	 * Note that it copies only properties that are present in entity schema.
	 */
	create(entityLike?: DeepPartial<T>): T;
	create(entityLike?: DeepPartial<T> | DeepPartial<T>[]): T | T[] {
		return makeClassInstance<T>(entityLike, this.repository);
	}
}
