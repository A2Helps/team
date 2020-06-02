import Model from '@/models';
import BatchItem from './BatchItem';
import Merchant from './Merchant';

export default class Batch extends Model {
	resource() {
		return 'batches';
	}

	batch_items() {
		return this.hasMany(BatchItem);
	}

	merchant() {
		return this.hasOne(Merchant);
	}
}
