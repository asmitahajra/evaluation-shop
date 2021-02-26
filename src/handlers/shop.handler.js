const healthShopHandler= async (req, res) => {
    res.status(200).send("Shop server is up now!");
  };

const fetchDataHandler= async(req, res)=> {
    const {names} =req.query;
    res.status(200).send("Data is fetched!");
}
  
module.exports = {healthShopHandler, fetchDataHandler};
    