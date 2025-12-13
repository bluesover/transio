#!/bin/bash

# Transio Server Manager - One script to rule them all

show_menu() {
    echo ""
    echo "╔═══════════════════════════════════════════════╗"
    echo "║   🚀 Transio Saxon-HE Server Manager         ║"
    echo "╚═══════════════════════════════════════════════╝"
    echo ""
    echo "  1. Start Server"
    echo "  2. Stop Server"
    echo "  3. Restart Server"
    echo "  4. Server Status"
    echo "  5. View Logs (last 50 lines)"
    echo "  6. Setup Saxon-HE"
    echo "  7. Full Reset (reinstall everything)"
    echo "  8. Help/Troubleshooting"
    echo "  9. Exit"
    echo ""
}

check_port() {
    if lsof -ti:3001 > /dev/null 2>&1; then
        PID=$(lsof -ti:3001)
        echo "✅ Server is running (PID: $PID, Port: 3001)"
        echo "   Health check: http://localhost:3001/api/health"
        return 0
    else
        echo "❌ Server is not running"
        return 1
    fi
}

start_server() {
    echo ""
    echo "🚀 Starting server..."
    ./start-server.sh
}

stop_server() {
    echo ""
    echo "🛑 Stopping server..."
    ./stop-server.sh
}

restart_server() {
    echo ""
    echo "🔄 Restarting server..."
    ./stop-server.sh
    sleep 2
    ./start-server.sh
}

show_status() {
    echo ""
    echo "📊 Server Status:"
    echo "─────────────────────────────────────────────"
    check_port
    echo ""
    
    if [ -f "server/saxon/saxon-he-12.5.jar" ]; then
        echo "✅ Saxon-HE JAR found"
    else
        echo "❌ Saxon-HE JAR not found (run option 6 to setup)"
    fi
    
    if [ -d "server/node_modules" ]; then
        echo "✅ Server dependencies installed"
    else
        echo "❌ Server dependencies not installed"
    fi
    
    echo ""
}

view_logs() {
    echo ""
    echo "📋 Recent Server Logs:"
    echo "─────────────────────────────────────────────"
    
    if [ -f "server/logs/server.log" ]; then
        tail -50 server/logs/server.log
    else
        echo "No log file found. Server may not have been started yet."
    fi
    
    echo ""
    echo "Press Enter to continue..."
    read
}

setup_saxon() {
    echo ""
    echo "📦 Setting up Saxon-HE..."
    cd server
    npm run setup
    cd ..
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "Press Enter to continue..."
    read
}

full_reset() {
    echo ""
    echo "⚠️  WARNING: This will delete and reinstall everything!"
    echo ""
    read -p "Are you sure? (type YES to confirm): " -r
    
    if [ "$REPLY" != "YES" ]; then
        echo "Cancelled."
        return
    fi
    
    echo ""
    echo "🧹 Stopping server..."
    ./stop-server.sh 2>/dev/null
    
    echo "🧹 Cleaning server directory..."
    cd server
    rm -rf node_modules saxon temp
    
    echo "📦 Installing dependencies..."
    npm install
    
    echo "📦 Setting up Saxon-HE..."
    npm run setup
    
    cd ..
    
    echo ""
    echo "✅ Full reset complete!"
    echo ""
    echo "Press Enter to continue..."
    read
}

show_help() {
    echo ""
    cat SERVER_TROUBLESHOOTING_GUIDE.md
    echo ""
    echo "Press Enter to continue..."
    read
}

# Main loop
while true; do
    clear
    show_menu
    
    read -p "Select an option (1-9): " choice
    
    case $choice in
        1)
            start_server
            ;;
        2)
            stop_server
            echo ""
            echo "Press Enter to continue..."
            read
            ;;
        3)
            restart_server
            ;;
        4)
            show_status
            echo "Press Enter to continue..."
            read
            ;;
        5)
            view_logs
            ;;
        6)
            setup_saxon
            ;;
        7)
            full_reset
            ;;
        8)
            show_help
            ;;
        9)
            echo ""
            echo "👋 Goodbye!"
            echo ""
            exit 0
            ;;
        *)
            echo ""
            echo "❌ Invalid option. Please select 1-9."
            sleep 2
            ;;
    esac
done
