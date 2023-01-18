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
    constructor(api, userId) {
        this.api = api;
        this.userId = userId;
    }
    getResults() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.api}?id=${this.userId.toString()}`);
                this._list = yield response.json();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('DELETE', this.api);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('id', id.toString());
                xhr.setRequestHeader('user_id', this.userId.toString());
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        console.log("Successful DELETE request");
                        console.log(xhr.responseText);
                    }
                    else {
                        console.log("Error: " + xhr.status);
                    }
                };
                xhr.onerror = () => {
                    console.log("Error while making DELETE request");
                };
                xhr.send();
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
