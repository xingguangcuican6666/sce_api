# 基于官方Node.js镜像
FROM node:18

# 安装ODBC驱动（适用于Debian/Ubuntu）
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    unixodbc-dev \
    odbcinst \
    && rm -rf /var/lib/apt/lists/*

# 拷贝项目文件
WORKDIR /app
COPY package.json ./
COPY api.js ./
COPY start.sh ./
RUN chmod +x start.sh

# 安装依赖
RUN npm install

# 拷贝其他文件（如有）
COPY . .

# 设置环境变量端口（Azure兼容）
ENV PORT=3000

# 容器启动命令
CMD ["./start.sh"]