#!/bin/bash

# 🚀 Script de Deploy Helper - 1000 Videos Landing
# Este script ajuda a fazer deploy do projeto

set -e

echo "🚀 1000 Videos - Deploy Helper"
echo "================================"
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para verificar se comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Menu principal
echo "Escolha uma opção de deploy:"
echo ""
echo "1) Deploy na Vercel (Recomendado)"
echo "2) Deploy na Netlify"
echo "3) Build local apenas (testar)"
echo "4) Deploy do Storybook"
echo "5) Sair"
echo ""
read -p "Opção (1-5): " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}📦 Deploy na Vercel${NC}"
        echo ""

        # Verificar se Vercel CLI está instalado
        if ! command_exists vercel; then
            echo -e "${YELLOW}⚠️  Vercel CLI não encontrado. Instalando...${NC}"
            npm install -g vercel
        fi

        # Build primeiro
        echo -e "${BLUE}🔨 Fazendo build...${NC}"
        npm run build

        echo ""
        echo -e "${GREEN}✅ Build concluído!${NC}"
        echo ""

        # Deploy
        echo -e "${BLUE}🚀 Fazendo deploy na Vercel...${NC}"
        vercel --prod

        echo ""
        echo -e "${GREEN}✅ Deploy concluído!${NC}"
        echo ""
        echo "🔗 Suas variantes estarão disponíveis em:"
        echo "   Neo-Brutalist PT-BR: /?variant=neo_brutalist_ptbr"
        echo "   Modern PT-BR: /?variant=modern_ptbr"
        echo "   Studio PT-BR: /?variant=production_studio_ptbr"
        echo "   Premium: /?variant=premium"
        echo ""
        echo "📝 Atalhos configurados:"
        echo "   /neo → Neo-Brutalist PT-BR"
        echo "   /modern → Modern PT-BR"
        echo "   /studio → Studio PT-BR"
        echo "   /premium → Premium"
        ;;

    2)
        echo ""
        echo -e "${BLUE}📦 Deploy na Netlify${NC}"
        echo ""

        # Verificar se Netlify CLI está instalado
        if ! command_exists netlify; then
            echo -e "${YELLOW}⚠️  Netlify CLI não encontrado. Instalando...${NC}"
            npm install -g netlify-cli
        fi

        # Build primeiro
        echo -e "${BLUE}🔨 Fazendo build...${NC}"
        npm run build

        echo ""
        echo -e "${GREEN}✅ Build concluído!${NC}"
        echo ""

        # Deploy
        echo -e "${BLUE}🚀 Fazendo deploy na Netlify...${NC}"
        netlify deploy --prod

        echo ""
        echo -e "${GREEN}✅ Deploy concluído!${NC}"
        ;;

    3)
        echo ""
        echo -e "${BLUE}🔨 Build Local${NC}"
        echo ""

        # Build
        npm run build

        echo ""
        echo -e "${GREEN}✅ Build concluído!${NC}"
        echo ""
        echo "Para testar localmente, execute:"
        echo -e "${BLUE}npm run preview${NC}"
        echo ""
        echo "Depois acesse: http://localhost:4173"
        ;;

    4)
        echo ""
        echo -e "${BLUE}📚 Deploy do Storybook${NC}"
        echo ""

        # Verificar se Vercel CLI está instalado
        if ! command_exists vercel; then
            echo -e "${YELLOW}⚠️  Vercel CLI não encontrado. Instalando...${NC}"
            npm install -g vercel
        fi

        # Build Storybook
        echo -e "${BLUE}🔨 Fazendo build do Storybook...${NC}"
        npm run build-storybook

        echo ""
        echo -e "${GREEN}✅ Build do Storybook concluído!${NC}"
        echo ""

        # Deploy
        echo -e "${BLUE}🚀 Fazendo deploy do Storybook...${NC}"
        cd storybook-static
        vercel --prod
        cd ..

        echo ""
        echo -e "${GREEN}✅ Deploy do Storybook concluído!${NC}"
        ;;

    5)
        echo ""
        echo "👋 Até logo!"
        exit 0
        ;;

    *)
        echo ""
        echo -e "${RED}❌ Opção inválida${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Tudo pronto!${NC}"
echo ""
