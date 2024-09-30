# Stage 1: Build Azure Functions Core Tools from source
FROM --platform=linux/arm64 mcr.microsoft.com/dotnet/sdk:8.0 AS builder

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y git unzip

# Azure Functions Core Tools のソースコードをクローン
RUN git clone https://github.com/Azure/azure-functions-core-tools.git /tmp/azure-functions-core-tools

# 作業ディレクトリを設定
WORKDIR /tmp/azure-functions-core-tools

# https://github.com/Azure/azure-functions-core-tools/releases/tag/4.0.6280
RUN git checkout tags/4.0.6280

# Azure Functions Core Tools をビルド
RUN dotnet publish src/Azure.Functions.Cli/Azure.Functions.Cli.csproj \
    --runtime linux-arm64 \
    --self-contained true \
    --output /opt/azure-functions-core-tools \
    --framework net8.0

# Stage 2: Final image
FROM --platform=linux/arm64 mcr.microsoft.com/dotnet/sdk:8.0

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# ビルドステージから Azure Functions Core Tools をコピー
COPY --from=builder /opt/azure-functions-core-tools /opt/azure-functions-core-tools

# シンボリックリンクを作成
RUN ln -s /opt/azure-functions-core-tools/func /usr/local/bin/func \
    && chmod +x /opt/azure-functions-core-tools/func

# PATH を更新
ENV PATH="$PATH:/opt/azure-functions-core-tools"

# 必要に応じてエントリポイントやデフォルトコマンドを設定
# CMD ["sleep", "infinity"]
