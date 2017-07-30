// exports = {
//     name: 'body name',
//     hello() {
//         console.log(this.name);
//     }
// };

exports.name = 'body name';
exports.hello = () => console.log(this.name);

// module.exports = null;