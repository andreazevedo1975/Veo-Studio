
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {
  ExternalLinkIcon,
  LaptopIcon,
  SmartphoneIcon,
  WrenchIcon,
  XMarkIcon
} from './icons';

interface ExternalToolsDialogProps {
  onClose: () => void;
}

const ExternalToolsDialog: React.FC<ExternalToolsDialogProps> = ({ onClose }) => {
  const tools = [
    {
      name: "CapCut",
      platform: "Mobile / PC",
      description: "O editor mais popular e fácil de usar. Perfeito para unir vários clipes do Veo, adicionar transições e legendas automáticas.",
      url: "https://www.capcut.com/",
      icon: <SmartphoneIcon className="w-5 h-5 text-blue-400" />
    },
    {
      name: "Canva",
      platform: "Web / Mobile",
      description: "Ideal para criar montagens rápidas sem instalar nada. Basta fazer upload dos seus clipes e arrastar para a linha do tempo.",
      url: "https://www.canva.com/pt_br/criar/editor-video/",
      icon: <LaptopIcon className="w-5 h-5 text-purple-400" />
    },
    {
      name: "DaVinci Resolve",
      platform: "PC / Mac",
      description: "A ferramenta profissional gratuita de Hollywood. Se você quer fazer correção de cor e edição complexa, esta é a escolha.",
      url: "https://www.blackmagicdesign.com/br/products/davinciresolve",
      icon: <WrenchIcon className="w-5 h-5 text-orange-400" />
    },
    {
      name: "Clideo",
      platform: "Web",
      description: "Ferramenta online focada exclusivamente em unir vídeos (Merge). Rápido e sem necessidade de login complexo.",
      url: "https://clideo.com/pt/merge-video",
      icon: <ExternalLinkIcon className="w-5 h-5 text-green-400" />
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-[#1f1f1f] border border-gray-700 rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 rounded-lg">
              <WrenchIcon className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Estúdio de Montagem (Externo)</h2>
              <p className="text-xs text-gray-400 mt-1">Crie vídeos longos unindo seus clipes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="mb-6 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
            <p className="text-sm text-indigo-200 leading-relaxed">
              <strong>Dica Pro:</strong> O modelo Veo gera clipes de alta qualidade de até 8 segundos. 
              Para criar filmes, videoclipes ou conteúdos longos, a melhor estratégia é gerar várias cenas 
              aqui e uni-las usando ferramentas de edição dedicadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 hover:border-indigo-500/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {tool.icon}
                    <h3 className="font-semibold text-gray-200">{tool.name}</h3>
                  </div>
                  <ExternalLinkIcon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-2">
                  {tool.platform}
                </span>
                <p className="text-sm text-gray-400 leading-snug">
                  {tool.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-900/50 border-t border-gray-700 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Entendi, vou tentar!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExternalToolsDialog;
