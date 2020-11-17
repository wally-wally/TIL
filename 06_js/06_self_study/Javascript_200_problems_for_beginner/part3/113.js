Date.prototype.yyyymmdd = function() {
    const yyyy = this.getFullYear();
    const mm = this.getMonth() < 9 ? 
                `0${this.getMonth() + 1}` : this.getMonth() + 1;
    const dd = this.getDate() < 10 ? 
                `0${this.getDate()}` : this.getDate();
    return '' + yyyy + mm + dd;
}

const date = new Date();
console.log(date.yyyymmdd());