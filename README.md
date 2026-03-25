# petproject
# AI-блокнот

Минимальное веб-приложение на React + TypeScript для работы с текстом через DeepSeek API.

## Запуск

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Запустите проект:
   ```bash
   npm run dev
   ```
3. Откройте ссылку из терминала (обычно `http://localhost:5173`).

## Сборка

```bash
npm run build
```

## Если появляется ошибка `bash: /.bashrc: No such file or directory`

Выполните команды ниже, чтобы создать `~/.bashrc` и подключить `nvm`:

```bash
mkdir -p ~
touch ~/.bashrc
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' >> ~/.bashrc
source ~/.bashrc
```

После этого установите Node.js LTS и проверьте версии:

```bash
nvm install --lts
nvm use --lts
node -v
npm -v
```
