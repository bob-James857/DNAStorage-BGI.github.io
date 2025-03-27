document.addEventListener('DOMContentLoaded', function() {
    // 加载媒体报道数据
    fetch('../media/report.json')
        .then(response => response.json())
        .then(data => {
            const mediaGrid = document.getElementById('mediaGrid');
            if (!mediaGrid) return;
            
            // 清空现有内容
            mediaGrid.innerHTML = '';
            
            // 添加每个媒体项
            data.forEach(item => {
                const mediaItem = document.createElement('a');
                mediaItem.className = 'media-item';
                mediaItem.href = item.Url;
                mediaItem.target = '_blank';
                
                // 创建媒体项的HTML结构
                mediaItem.innerHTML = `
                    <div class="media-image">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <div class="media-info">
                        <div class="media-title">${item.标题}</div>
                        <div class="media-source">${item.杂志社}</div>
                        <div class="media-type">${item.类型}</div>
                        <div class="media-link">Read More</div>
                    </div>
                `;
                
                mediaGrid.appendChild(mediaItem);
            });
        })
        .catch(error => console.error('Error loading media data:', error));
});