import {} from 'jasmine';
import { generateRandomUser } from './user.model';

describe('User model', () => {
    it('Get the user model', () => {
        const user = generateRandomUser();
        console.log(user);
    });
});
