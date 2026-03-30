import 'package:flutter/material.dart';

void main() {
  runApp(const IPartyApp());
}

/// [IPartyApp] é o widget raiz da aplicação
class IPartyApp extends StatelessWidget {
  const IPartyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'iParty Dashboard',
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF191919),
        useMaterial3: true,
      ),
      home: const IPartyDashboardPage(),
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
          VerticalDivider(color: Colors.grey[800], width: 1, thickness: 1),

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
    return Container(
      width: 250,
      color: const Color(0xFF191919),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // iParty
          Row(
            children: [
              //logo
              Container(
                width: 40,
                height: 40,
                decoration: const BoxDecoration(
                  color: Color(0xFFFF007F),
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 12),
              // Texto
              const Text(
                'iParty',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ],
          ),
          const SizedBox(height: 30),
          // itens de navegação
          Expanded(
            child: ListView.separated(
              itemCount: 6, // Número de itens
              separatorBuilder: (ctx, index) => const SizedBox(height: 15),
              itemBuilder: (context, index) {
                return const SidebarNavItem(title: 'Item');
              },
            ),
          ),
          // botao de thema
          const Padding(
            padding: EdgeInsets.only(bottom: 20),
            child: SidebarNavItem(title: 'Item'),
          ),
        ],
      ),
    );
  }
}

/// [SidebarNavItem] representa um único item clicável na barra lateral.
class SidebarNavItem extends StatelessWidget {
  final String title;

  const SidebarNavItem({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {},
      borderRadius: BorderRadius.circular(10),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8.0),
        child: Row(
          children: [
            Container(
              width: 30,
              height: 30,
              decoration: BoxDecoration(
                color: Colors.grey[400],
                shape: BoxShape.circle,
              ),
            ),
            const SizedBox(width: 15),
            Text(
              title,
              style: const TextStyle(fontSize: 18, color: Colors.white),
            ),
          ],
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
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
      color: const Color(0xFF191919),
      child: Row(
        children: [
          // Barra de Pesquisa
          Expanded(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 400,
                  height: 40,
                  decoration: BoxDecoration(
                    color: const Color(0xFF333333),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    children: [
                      const SizedBox(width: 15),
                      const Icon(Icons.search, color: Colors.grey),
                      const SizedBox(width: 10),
                      Expanded(
                        child: TextField(
                          decoration: const InputDecoration(
                            hintText: 'Pesquisar por eventos próximos',
                            hintStyle: TextStyle(color: Colors.grey),
                            border: InputBorder.none,
                            contentPadding: EdgeInsets.zero,
                          ),
                          style: const TextStyle(color: Colors.white),
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
              // Ícone de Home
              const Icon(Icons.home, color: Colors.white),
              const SizedBox(width: 20),
              // Ícone de Notificações
              Stack(
                children: [
                  const Icon(Icons.notifications, color: Colors.white),
                  Positioned(
                    right: 0,
                    top: 0,
                    child: Container(
                      padding: const EdgeInsets.all(2),
                      decoration: const BoxDecoration(
                        color: Color(0xFFFF007F), // Rosa vibrante do Badge
                        shape: BoxShape.circle,
                      ),
                      constraints: const BoxConstraints(
                        minWidth: 14,
                        minHeight: 14,
                      ),
                      child: const Text(
                        '5',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 9,
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 20),
              // Ícone de Perfil
              CircleAvatar(
                radius: 18,
                backgroundColor: Colors.grey[400],
                child: const Icon(Icons.person, color: Colors.white, size: 20),
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
    return Container(
      width: 250,
      height: 300,
      decoration: BoxDecoration(
        color: const Color(0xFF262626),
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 10,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      padding: const EdgeInsets.all(15),
      child: Column(
        children: [
          const Text(
            'Chat Adm',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 10),
          const Divider(color: Colors.grey),
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
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          // contato com um ponto online
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
          // Informações do contato
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                Text(
                  lastMessage,
                  style: const TextStyle(color: Colors.grey, fontSize: 14),
                  overflow:
                      TextOverflow.ellipsis, // Corta o texto se  muito longo
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
