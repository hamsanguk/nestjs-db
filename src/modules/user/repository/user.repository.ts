import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../common/db/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOne(options): Promise<User | null> {
    // Todo: findOne은 어떤 조건이 들어올지 몰라도 where절에 options를 통해 데이터를 조회해야 합니다.
    return this.userRepository.findOne({where:options});
  }

  async findAll(): Promise<User[]> {
    // Todo: findAll은 전체 데이터를 조회해야 합니다.
    
    return this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Todo: create은 유저 데이터를 생성해야 합니다.
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async countAll(): Promise<number> {
    // Todo: countAll은 전체 데이터의 개수를 조회해야 합니다.
    return this.userRepository.count();
  }

  async existsByUserId(userId: string): Promise<boolean> {
    // Todo: existsByUserId은 userId로 유저의 정보가 있는지 확인해야 합니다. 리턴은 boolean으로 해주세요.
    const count = await this.userRepository.count({where:{userId} });
    return count>0;
  }//count로 boolean return

  async update(
    userId: string,
    updateUserDto: Partial<CreateUserDto>
  ): Promise<User> {
    // Todo: update은 userId로 유저의 정보를 수정해야 합니다.
    const user = await this.userRepository.findOne({where:{userId}});
    if(!user) throw new Error(`User with userId ${userId} not found`);
    
    Object.assign(user,updateUserDto);
    return this.userRepository.save(user);
  }

  async delete(userId: string): Promise<void> {
    // Todo: delete은 userId로 유저의 정보를 삭제해야 합니다.
    await this.userRepository.delete({userId});
  }
}
