 <template>
  <div class="detail_page">
        <head-top :head-title="title" go-back='true'></head-top>
        <section id="scroll_section" class="scroll_container">
            <section v-html="markdownText" class="markdown"></section>
        </section>
    </div>
</template>

<script>
    import headTop from '@/components/header/head'

    export default {
      data(){
            return{
    			markdownText: this.$route.query.content,
                title: this.$route.query.title
            }
        },
        components: {
            headTop,
        },
        computed: {
        },
        mounted() {
        }
    }
</script>
  
<style lang="scss" scoped>
    @import '@/style/mixin';
  
    .detail_page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .scroll_container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding-top: 1.95rem;
        overflow-y: auto;
    }
    .markdown{
    	font-size: .65rem;
    	padding: 0 .7rem;
        color: #666;
        padding-bottom: 2rem;
    }

</style>
