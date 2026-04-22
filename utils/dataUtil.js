//import {faker} from `@faker-js/faker`;

class dataUtil {
    getTodaysDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const time = String(today.getHours()).padStart(2, '0') +"-"+ String(today.getMinutes()).padStart(2, '0') +"-"+ String(today.getSeconds()).padStart(2, '0');
        return `${day}-${month}-${time}`;
    }

     IMNotebookName() {
        return `Test-IMNotebook-${this.getTodaysDate()}`;
    }

     SENotebookName(){
        return `Test-SENotebook-${this.getTodaysDate()}`;

     }


}
export { dataUtil };