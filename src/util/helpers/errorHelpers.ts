import { updateObj } from 'util/index';

export class TypeValidatorTools {
	__type: string = '';
	errors: any = {};

	constructor(__type: string) {
		if (!__type) return;
		if (__type) this.__type = __type;
	}

	typeMessage(key: string, shouldBe: string, val: any): string {
		return `Class ${this.__type} required '${key}' to be type ${shouldBe}. Recieved ${typeof val}`;
	}

	requiredValMessage(key: string): string {
		return `Type '${this.__type}' missing field ${key}.`;
	}

	addError(key: string, message: string) {
		let updatedErrors = updateObj(this.errors, { [key]: message });

		this.errors = updatedErrors;
	}

	hasNoErrors() {
		return Object.keys(this.errors).length === 0;
	}

	printError(classObj?: any) {
		let k = Object.entries(this.errors);
		let key = k[0][0] || 'not found';
		let msg = k[0][1] || 'not found';

		console.log(`${this.__type} CLASS ERROR for ${key}:: ${msg}`);
		console.log(classObj);
	}
}
