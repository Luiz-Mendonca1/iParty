import 'package:flutter/material.dart';

// O ValueNotifier guarda o estado (Dark ou Light) e avisa quem estiver "ouvindo"
ValueNotifier<ThemeMode> themeNotifier = ValueNotifier(ThemeMode.dark);

void main() {
  runApp(const IPartyApp());
}

/// [IPartyApp] é o widget raiz da aplicação
class IPartyApp extends StatelessWidget {
  const IPartyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<ThemeMode>(
      valueListenable: themeNotifier,
      builder: (_, ThemeMode currentMode, _) {
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'iParty Dashboard',
          themeMode: currentMode, // Usa o modo atual (Light ou Dark)
          // Configuração do Tema Claro
          theme: ThemeData(
            brightness: Brightness.light,
            primaryColor: const Color(0xFFFF007F),
            scaffoldBackgroundColor: const Color(0xFFF5F5F5),
            dividerColor: Colors.grey[300],
            cardColor:
                Colors.white, // Usado para fundos de containers no modo claro
          ),

          // Configuração do Tema Escuro
          darkTheme: ThemeData(
            brightness: Brightness.dark,
            primaryColor: const Color(0xFFFF007F),
            scaffoldBackgroundColor: const Color(0xFF131416),
            dividerColor: Colors.grey[900],
            cardColor: const Color(
              0xFF20232A,
            ), // Usado para fundos de containers no modo escuro
          ),

          home: const IPartyDashboardPage(),
        );
      },
    );
  }
}

/// [IPartyDashboardPage] define a estrutura geral do layout
class IPartyDashboardPage extends StatelessWidget {
  const IPartyDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Row para dividir a tela
      body: Row(
        children: [
          //Barra Lateral
          const SidebarWidget(),

          // Linha divisória vertical
          VerticalDivider(
            color: Theme.of(context).dividerColor,
            width: 1,
            thickness: 1,
          ),

          //Conteúdo Principal
          Expanded(
            child: Stack(
              children: [
                // Coluna para o cabeçalho e a área de conteúdo
                const Column(
                  children: [
                    // Cabeçalho
                    TopHeaderWidget(),
                    // conteúdo
                    Expanded(child: SizedBox.expand()),
                  ],
                ),
                // Chat
                Positioned(
                  bottom: 20,
                  right: 20,
                  child: const ChatOverlayWidget(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// [SidebarWidget] barra lateral
class SidebarWidget extends StatelessWidget {
  const SidebarWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final bool isDark = Theme.of(context).brightness == Brightness.dark;

    // Cores dinâmicas baseadas no tema
    final Color bgColor = isDark ? const Color(0xFF131416) : Colors.white;
    final Color textColor = isDark ? Colors.white : Colors.black87;
    const Color logoPink = Color(0xFFFF007F);
    final Color iconBgColor = isDark
        ? const Color(0xFF20232A)
        : Colors.grey[200]!;

    return Container(
      width: 280,
      color: bgColor,
      padding: const EdgeInsets.symmetric(horizontal: 25, vertical: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // iParty
          Row(
            children: [
              Container(
                width: 42,
                height: 42,
                decoration: const BoxDecoration(
                  color: logoPink,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 15),
              Text(
                'iParty',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: textColor,
                  letterSpacing: 0.5,
                ),
              ),
            ],
          ),

          const SizedBox(height: 15),
          Divider(color: Theme.of(context).dividerColor, thickness: 1),
          const SizedBox(height: 15),

          // itens de navegação
          Expanded(
            child: ListView(
              shrinkWrap: true,
              children: [
                // _SidebarNavItem para cada item
                _SidebarNavItem(
                  icon: Icons.home_outlined,
                  title: 'Início',
                  backgroundColor: iconBgColor,
                ),
                const SizedBox(height: 12),
                _SidebarNavItem(
                  icon: Icons.explore_outlined,
                  title: 'Explorar',
                  backgroundColor: iconBgColor,
                ),
                const SizedBox(height: 12),
                _SidebarNavItem(
                  icon: Icons.calendar_today_outlined,
                  title: 'Eventos',
                  backgroundColor: iconBgColor,
                ),
                const SizedBox(height: 12),
                _SidebarNavItem(
                  icon: Icons.confirmation_number_outlined,
                  title: 'Ingressos',
                  backgroundColor: iconBgColor,
                ),
                const SizedBox(height: 12),
                _SidebarNavItem(
                  icon: Icons.bookmark_border_outlined,
                  title: 'Favoritos',
                  backgroundColor: iconBgColor,
                ),
                const SizedBox(height: 12),
                _SidebarNavItem(
                  icon: Icons.settings_outlined,
                  title: 'Configurações',
                  backgroundColor: iconBgColor,
                ),
              ],
            ),
          ),

          // botao de thema
          Divider(color: Theme.of(context).dividerColor),
          const SizedBox(height: 15),

          ValueListenableBuilder<ThemeMode>(
            valueListenable: themeNotifier,
            builder: (context, currentMode, _) {
              final bool isLight = currentMode == ThemeMode.light;
              return InkWell(
                onTap: () {
                  // Lógica de Alternância:
                  // Se estiver Dark, vira Light. Se estiver Light, vira Dark.
                  themeNotifier.value = isLight
                      ? ThemeMode.dark
                      : ThemeMode.light;
                },
                borderRadius: BorderRadius.circular(10),
                hoverColor: isLight ? Colors.black12 : Colors.white10,
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Row(
                    children: [
                      // O ícone muda dinamicamente conforme o tema
                      Icon(
                        isLight
                            ? Icons.dark_mode_outlined
                            : Icons.wb_sunny_outlined,
                        color: isLight ? Colors.black87 : Colors.white,
                      ),
                      const SizedBox(width: 15),
                      Text(
                        isLight ? 'Modo Escuro' : 'Modo Claro',
                        style: TextStyle(
                          color: isLight ? Colors.black87 : Colors.white,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
          const SizedBox(height: 10),
        ],
      ),
    );
  }
}

/// [_SidebarNavItem] é um widget auxiliar privado para renderizar cada item de navegação.
class _SidebarNavItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final Color backgroundColor;

  const _SidebarNavItem({
    required this.icon,
    required this.title,
    required this.backgroundColor,
  });

  @override
  Widget build(BuildContext context) {
    final bool isDark = Theme.of(context).brightness == Brightness.dark;

    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: InkWell(
        onTap: () {},
        borderRadius: BorderRadius.circular(12),
        hoverColor: isDark
            ? Colors.white.withValues(alpha: 0.05)
            : Colors.black.withValues(alpha: 0.05),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 8.0),
          child: Row(
            children: [
              // Círculo de fundo para o ícone
              Container(
                width: 45,
                height: 45,
                decoration: BoxDecoration(
                  color: backgroundColor,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  icon,
                  color: isDark ? Colors.white70 : Colors.black54,
                  size: 24,
                ),
              ),
              const SizedBox(width: 15),
              // Título do Item
              Text(
                title,
                style: TextStyle(
                  fontSize: 18,
                  color: isDark ? Colors.white : Colors.black87,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// [TopHeaderWidget] é o cabeçalho .
class TopHeaderWidget extends StatelessWidget {
  const TopHeaderWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
      color: isDark ? const Color(0xFF131416) : Colors.white,
      child: Row(
        children: [
          // Barra de Pesquisa
          Expanded(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center, 
              children: [
                Container(
                  width: 500,
                  height: 55,
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF333333) : Colors.grey[200],
                    borderRadius: BorderRadius.circular(28),
                  ),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center, 
                    children: [
                      const SizedBox(width: 20),
                      const Icon(Icons.search, color: Colors.grey, size: 30),
                      const SizedBox(width: 15),
                      Expanded(
                        child: TextField(
                          textAlignVertical: TextAlignVertical.center, 
                          decoration: const InputDecoration(
                            hintText: 'Pesquisar por eventos próximos',
                            hintStyle: TextStyle(color: Colors.grey, fontSize: 18),
                            border: InputBorder.none,
                            isCollapsed: true, 
                            contentPadding: EdgeInsets.zero, 
                          ),
                          style: TextStyle(
                            color: isDark ? Colors.white : Colors.black87, 
                            fontSize: 18,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          // Ícones cabeçalho
          Row(
            children: [
              Icon(Icons.home, color: isDark ? Colors.white : Colors.black87, size: 30),
              const SizedBox(width: 25),
              Stack(
                children: [
                  Icon(
                    Icons.notifications,
                    color: isDark ? Colors.white : Colors.black87, size: 30,
                  ),
                  Positioned(
                    right: 0,
                    top: 0,
                    child: Container(
                      padding: const EdgeInsets.all(2),
                      decoration: const BoxDecoration(
                        color: Color(0xFFFF007F),
                        shape: BoxShape.circle,
                      ),
                      constraints: const BoxConstraints(
                        minWidth: 15,
                        minHeight: 15,
                      ),
                      child: const Text(
                        '5',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 20),
              CircleAvatar(
                radius: 22,
                backgroundColor: Colors.grey[600],
                child: const Icon(Icons.person, color: Colors.white, size: 30),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

/// [ChatOverlayWidget] chat.
class ChatOverlayWidget extends StatelessWidget {
  const ChatOverlayWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      width: 250,
      height: 300,
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF262626) : Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(isDark ? 0.3 : 0.1),
            blurRadius: 10,
            offset: const Offset(0, 5),
          ),
        ],
        border: isDark ? null : Border.all(color: Colors.grey[300]!),
      ),
      padding: const EdgeInsets.all(15),
      child: Column(
        children: [
          Text(
            'Chat Adm',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: isDark ? Colors.white : Colors.black87,
            ),
          ),
          const SizedBox(height: 10),
          Divider(color: Theme.of(context).dividerColor),
          const SizedBox(height: 10),
          Expanded(
            child: ListView(
              children: const [
                ChatListItem(name: 'Adm 1', lastMessage: 'Como você está?'),
                ChatListItem(name: 'Adm 2', lastMessage: 'Olá, tudo bem?'),
                ChatListItem(name: 'Adm 3', lastMessage: 'Preciso de ajuda.'),
                ChatListItem(name: 'Adm 4', lastMessage: 'Pode falar agora?'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// [ChatListItem] único contato na lista de chat.
class ChatListItem extends StatelessWidget {
  final String name;
  final String lastMessage;

  const ChatListItem({
    super.key,
    required this.name,
    required this.lastMessage,
  });

  @override
  Widget build(BuildContext context) {
    final bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          Stack(
            children: [
              CircleAvatar(
                radius: 18,
                backgroundColor: Colors.grey[400],
                child: const Icon(Icons.person, color: Colors.white, size: 20),
              ),
              Positioned(
                right: 0,
                bottom: 0,
                child: Container(
                  width: 10,
                  height: 10,
                  decoration: const BoxDecoration(
                    color: Color(0xFFFF007F),
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: isDark ? Colors.white : Colors.black87,
                  ),
                ),
                Text(
                  lastMessage,
                  style: const TextStyle(color: Colors.grey, fontSize: 14),
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
