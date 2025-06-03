const logout = (req, res) => {
    //#swagger.tags=["Oauth"]
    req.logout(() => {
        req.session.destroy(() => {});
        res.status(200).send("Logged out of github");
    });
}

module.exports = { logout }