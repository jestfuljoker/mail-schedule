import { DeepPartial, ObjectLiteral, Repository } from "typeorm";

export function makeClassInstance<T>(
	entityLike: DeepPartial<T> | DeepPartial<T>[] | undefined,
): T | T[];
export function makeClassInstance<T extends ObjectLiteral>(
	entityLike: DeepPartial<T> | DeepPartial<T>[] | undefined,
	repository: Repository<T>,
): T | T[];
export function makeClassInstance<T extends ObjectLiteral>(
	entityLike: DeepPartial<T> | DeepPartial<T>[],
	repository?: Repository<T>,
): T | T[] {
	if (repository) {
		return entityLike ? repository.create(entityLike as DeepPartial<T>) : repository.create();
	}

	return entityLike as T | T[];
}
