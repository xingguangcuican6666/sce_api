// 引入依赖
const express = require('express');
const odbc = require('odbc');

const app = express();
const port = process.env.PORT || 3000;

// 连接字符串，建议密码用环境变量
const connectionString = `Driver={ODBC Driver 18 for SQL Server};Server=tcp:sce.database.windows.net,1433;Database=sce_data;Uid=xingguangcuican;Pwd=${process.env.AZURE_SQL_PASSWORD};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;`;

app.get('/api/umasce', async (req, res) => {
  let connection;
  try {
    connection = await odbc.connect(connectionString);
    const result = await connection.query('SELECT * FROM UmaSCE_Data');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.listen(port, () => {
  console.log(`API服务已启动，端口：${port}`);
  console.log('请用 GET /api/umasce 访问所有数据');
});