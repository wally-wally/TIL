<script>
  import { onInterval } from './utils';

  let seconds = 0;
  onInterval(() => {
    seconds += 1;
    console.log('interval 중...');
  }, 1000);
</script>

<p>{seconds} 초</p>