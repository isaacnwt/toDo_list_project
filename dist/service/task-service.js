var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class TaskService {
    constructor(userId) {
        this.userId = userId;
        this.api = "http://localhost/todo-list-api/todo.php";
        this.header = { 'Content-Type': 'application/x-www-form-urlencoded' };
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.api}?id=${this.userId.toString()}`);
                return yield response.json();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    create(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = this.getBody(title, description);
                const response = yield fetch(this.api, {
                    method: "POST",
                    headers: this.header,
                    body: body
                });
                return response;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.api, {
                    method: 'DELETE',
                    headers: this.header,
                    body: `id=${id}&user_id=${this.userId}`
                });
                return response;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    ;
    getBody(title, description) {
        if (description) {
            return `title=${title}&description=${description}&user_id=${this.userId}`;
        }
        else {
            return `title=${title}&user_id=${this.userId}`;
        }
    }
}
