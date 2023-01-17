var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class TaskList {
    constructor(api) {
        this.api = api;
    }
    getResults() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.api);
                this._list = yield response.json();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    get list() {
        return this._list;
    }
}
export { TaskList };
