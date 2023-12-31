import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../../user.entity'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

describe('UserEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a user with invalid name', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: '',
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 'i'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })

    it('Should throw an error when creating a user with invalid email', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: '',
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 'i'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })

    it('Should throw an error when creating a user with invalid password', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: '',
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: 'i'.repeat(101),
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })

    it('Should throw an error when creating a user with invalid createdAt', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        createdAt: '2023' as any,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        createdAt: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })

    it('Should a valid user', () => {
      expect.assertions(0)
      let props: UserProps = {
        ...UserDataBuilder({}),
      }
      new UserEntity(props)
    })
  })
  describe('Update method', () => {
    it('Should throw an error when update a user with invalid name', () => {
      const entity = new UserEntity(UserDataBuilder({}))
      expect(() => entity.updateName(null)).toThrowError(EntityValidationError)
      expect(() => entity.updateName('')).toThrowError(EntityValidationError)
      expect(() => entity.updateName(10 as any)).toThrowError(
        EntityValidationError,
      )
      expect(() => entity.updateName('a'.repeat(256))).toThrowError(
        EntityValidationError,
      )
    })

    it('Should a valid user', () => {
      expect.assertions(0)
      const props: UserProps = {
        ...UserDataBuilder({}),
      }
      const entity = new UserEntity(props)
      entity.updateName('Other name')
    })
  })

  describe('Update method', () => {
    it('Should a invalid user using password field', () => {
      const entity = new UserEntity(UserDataBuilder({}))
      expect(() => entity.updatePassoword(null)).toThrowError(
        EntityValidationError,
      )
      expect(() => entity.updatePassoword('')).toThrowError(
        EntityValidationError,
      )
      expect(() => entity.updatePassoword(10 as any)).toThrowError(
        EntityValidationError,
      )
      expect(() => entity.updatePassoword('a'.repeat(101))).toThrowError(
        EntityValidationError,
      )
    })

    it('Should a valid user', () => {
      expect.assertions(0)
      const props: UserProps = {
        ...UserDataBuilder({}),
      }
      const entity = new UserEntity(props)
      entity.updatePassoword('Other password')
    })
  })
})
