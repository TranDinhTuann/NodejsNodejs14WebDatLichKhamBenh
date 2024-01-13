

let getHomePage = (req, res) => {
    return res.send('Hello Tyrant');
}

module.exports = {
    getHomePage: getHomePage,
}