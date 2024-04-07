class UserFactory {
  users: any[] = [];
  create(name: string): any {
    this.users.push(name);
  }
  remove(name: string): any {
    this.users = this.users.filter((user) => user !== name);
  }
  annuoanceUser(name: string): any {
    console.log(`Annoying ${name}`);
  }
}

describe('UserFactory', () => {
  let userFactory: UserFactory;
  beforeEach(() => {
    userFactory = new UserFactory();
  });

  it('should create a new user', () => {
    userFactory.create('John Doe');
    expect(userFactory.users).toContain('John Doe');
  });
  it('should remove a user', () => {
    userFactory.create('John Doe');
    expect(userFactory.users).toContain('John Doe');
    userFactory.remove('John Doe');
    expect(userFactory.users).not.toContain('John Doe');
  });
  it('should annoy a user', () => {
    userFactory.annuoanceUser = jest.fn();
    userFactory.annuoanceUser('John Doe');
    expect(userFactory.annuoanceUser).toHaveBeenCalled();
    expect(userFactory.annuoanceUser).toHaveBeenCalledWith('John Doe');
    expect(userFactory.annuoanceUser).toHaveReturned();
    expect(userFactory.annuoanceUser).toHaveBeenCalledTimes(1);
  });
});
