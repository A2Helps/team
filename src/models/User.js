import Model from '@/models';

export default class User extends Model {
	resource() {
		return 'users';
	}
}
