import { Entity } from '@/shared/domain/entities/entity'
import { InMemoryRepository } from '../../in-memory.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it('Should inserts a new entity', async () => {
    const entity = new StubEntity({ name: 'TestName', price: 50 })
    await sut.insert(entity)
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('Should throw error when entity not found', async () => {
    await expect(sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should finds a entity by id', async () => {
    const entity = new StubEntity({ name: 'TestName', price: 50 })
    await sut.insert(entity)
    const result = await sut.findById(entity._id)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  it('Should returns all entities', async () => {
    const entity = new StubEntity({ name: 'TestName', price: 50 })
    await sut.insert(entity)
    const result = await sut.findAll()
    expect([entity]).toStrictEqual(result)
  })
  it('Should update an entity', async () => {
    const entity = new StubEntity({ name: 'TestName', price: 50 })
    await sut.insert(entity)
    const updatedEntity = new StubEntity(
      {
        name: 'UpdatedName',
        price: 100,
      },
      entity._id,
    )
    await sut.update(updatedEntity)
    const result = await sut.findById(updatedEntity.id)
    expect(updatedEntity.toJSON()).toStrictEqual(result.toJSON())
  })

  it('Should delete an entity', async () => {
    const entity = new StubEntity({ name: 'TestName', price: 50 })
    await sut.insert(entity)
    await sut.delete(entity.id)
    await expect(sut.findById(entity.id)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })
})
