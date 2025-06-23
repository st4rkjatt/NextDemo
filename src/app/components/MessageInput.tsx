
import { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

interface InputProps {
  receiverId: string | undefined;
  submitMessageFunc: (message: string) => void;
  handleTyping: () => void;
}

const MessageInput = ({ receiverId, submitMessageFunc, handleTyping }: InputProps) => {
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>()


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage(message)
    submitMessageFunc(message)
    setMessage("")
  }

  const sendMessage = async (message: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/sendmessage/${receiverId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      });
      await response.json();
      // // console.log(data, 'data')


    } catch (error) {
      console.error('Error signing up user:', error);
    }
    finally {
      setLoading(false);
    }

  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setMessage(value)
    handleTyping()
  }

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={handleChange}
            placeholder="Type a message..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all max-h-32"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                // Directly send the message logic here
                if (message.trim()) {
                  sendMessage(message);
                  submitMessageFunc(message);
                  setMessage("");
                }
              }
            }}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Smile className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!message.trim()}
          className={`
            p-3 rounded-full transition-all transform hover:scale-105
            ${message.trim()
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
