from django import template

register = template.Library()

@register.filter
def hashtag_link(word):
    # word 는 article 객체가 들어갈건데
    # article 의 content 들만 모두 가져와서 그 중 해시태그에만 링크를 붙인다.
    content = word.content + ' '
    hashtags = word.hashtags.all()

    for hashtag in hashtags:
        content = content.replace(hashtag.content + ' ', f'<a href="/articles/{hashtag.pk}/hashtag/">{hashtag.content}</a> ')
        # a 태그 작성시 </a> 뒤에 공백 한 칸 반드시 있어야 한다!
        # 공백이 없으면 모든 게시글들이 다 붙는다.
        
    return content