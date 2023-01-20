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
        this.api = "http://localhost/todo_list/todo.php";
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
    create(title, description = null) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.api, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `title=${title}&description=${description}&user_id=${this.userId}`
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
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
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
}
