// 引入依赖
const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

// mssql连接配置
const config = {
  user: 'xingguangcuican',
  password: process.env.AZURE_SQL_PASSWORD,
  server: 'sce.database.windows.net',
  database: 'sce_data',
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

app.get('/api/umasce', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM UmaSCE_Data');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await sql.close();
  }
});

app.listen(port, () => {
  console.log(`API服务已启动，端口：${port}`);
  console.log('请用 GET /api/umasce 访问所有数据');
});