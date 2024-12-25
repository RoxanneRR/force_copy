document.getElementById('copyText').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: copyPageContent
  });
});

function copyPageContent() {
  // 获取页面可见文本
  const text = document.body.innerText;
  
  // 创建临时textarea元素
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  
  // 选择并复制文本
  textarea.select();
  document.execCommand('copy');
  
  // 移除临时元素
  document.body.removeChild(textarea);
  
  // 显示成功消息
  const status = document.createElement('div');
  status.textContent = '复制成功!';
  status.style.position = 'fixed';
  status.style.top = '10px';
  status.style.left = '50%';
  status.style.transform = 'translateX(-50%)';
  status.style.padding = '10px';
  status.style.backgroundColor = '#4CAF50';
  status.style.color = 'white';
  status.style.borderRadius = '5px';
  status.style.zIndex = '9999';
  
  document.body.appendChild(status);
  setTimeout(() => document.body.removeChild(status), 2000);
}