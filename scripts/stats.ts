import fs from 'fs';
import z from 'zod';
import * as R from 'remeda';
import XLSX from 'xlsx';

const VodSchema = z.object({
  video_id: z.string(),
  title: z.string(),
  date: z.date(),
  duration: z.number(),
  yok: z.number(),
  gss_react_count: z.number(),
  nose_blow_count: z.number(),
  ac_adjust_count: z.number(),
  joeler: z.boolean(),
  ftc_count: z.number(),
  succ_ftc_count: z.number(),
});

const CategorySchema = z.object({
  video_id: z.string(),
  category: z.string(),
});

const ContentSchema = z.object({
  video_id: z.string(),
  content: z.string(),
});

const NotableSchema = z.object({
  video_id: z.string(),
  notable_person: z.string(),
});

const CollabSchema = z.object({
  video_id: z.string(),
  collab: z.string(),
});

const GameSchema = z.object({
  video_id: z.string(),
  game: z.string(),
  duration: z.number(),
});

const StorySchema = z.object({
  video_id: z.string(),
  story: z.string(),
  timestamp: z.number(),
});

const schemas = {
  vods: VodSchema,
  categories: CategorySchema,
  content: ContentSchema,
  notable_people: NotableSchema,
  collab: CollabSchema,
  games: GameSchema,
  stories: StorySchema,
  // 'predictions_promises'
} as const;

const file = fs.readFileSync(`static/atrioc-vods.xlsx`);
const workbook = XLSX.read(file, { cellDates: true });
const sheets = workbook.Sheets;

function parse_sheet<K extends keyof typeof schemas, Row extends z.infer<(typeof schemas)[K]>>(sheet_name: K): Row[] {
  const sheet = sheets[sheet_name];
  if (!sheet) {
    throw new Error(`Missing ${sheet_name} sheet`);
  }
  const schema = schemas[sheet_name];

  return XLSX.utils.sheet_to_json(sheet).map((v) => {
    return schema.parse(v) as Row;
  });
}

const vods = parse_sheet('vods');
const categories = R.groupByProp(parse_sheet('categories'), 'video_id');
const content = R.groupByProp(parse_sheet('content'), 'video_id');
const notables = R.groupByProp(parse_sheet('notable_people'), 'video_id');
const collabs = R.groupByProp(parse_sheet('collab'), 'video_id');
const games = parse_sheet('games');
const stories = R.groupByProp(parse_sheet('stories'), 'video_id');

// A stream is defined as all the vods on the same day.
const streams = R.pipe(
  vods,
  R.groupBy((v) => v.date.toString()),
  R.values()
);

const total_streams = streams.length;

const weekdayDist = (() => {
  const frequency = R.pipe(
    streams,
    R.map((stream) => stream[0].date.getDay()),
    R.countBy(R.identity())
  );
  return R.mapValues(frequency, (freq) => ({
    count: freq,
    percent: Number(((freq / total_streams) * 100).toFixed(1)),
  }));
})();

const longest_streams = (() => {
  const stream_durations = R.pipe(streams, R.map(R.sumBy(({ duration }) => duration)));

  const strms = R.zip(stream_durations, streams);

  const sorted_strms = R.sortBy(strms, [R.prop(0), 'desc']);

  return sorted_strms.slice(0, 5);
})();

const categoryDist = (() => {
  const categoriesPerStream = R.pipe(
    streams,
    R.map(R.map((vod) => categories[vod.video_id])),
    R.map(R.flat()),
    R.map(R.map(R.prop('category'))),
    R.map(R.unique())
  );

  const frequency = R.pipe(categoriesPerStream, R.flat(), R.countBy(R.identity()));

  return R.mapValues(frequency, (freq) => ({
    count: freq,
    percent: Number(((freq / total_streams) * 100).toFixed(1)),
  }));
})();

const total_nose_blow = R.sumBy(vods, (v) => v.nose_blow_count);
const total_ac_adjust = R.sumBy(vods, (v) => v.ac_adjust_count);

const total_joeler = R.sumBy(streams, (stream) => (stream.some(({ joeler }) => joeler) ? 1 : 0));

const total_gss_reacts = R.sumBy(vods, (v) => v.gss_react_count);

const contentCount = (() => {
  const contentPerStream = R.pipe(
    streams,
    R.map(R.map((vod) => content[vod.video_id])),
    R.map(R.flat()),
    R.map(R.map(R.prop('content'))),
    R.map(R.unique())
  );

  const frequency = R.pipe(contentPerStream, R.flat(), R.countBy(R.identity()));

  return R.pipe(frequency, R.entries(), R.sortBy([R.prop(1), 'desc']));
})();

const notableCount = (() => {
  const notablesPerStream = R.pipe(
    streams,
    R.map(R.map((vod) => notables[vod.video_id])),
    R.map(R.flat()),
    R.map(R.map(R.prop('notable_person'))),
    R.map(R.unique())
  );

  const frequency = R.pipe(notablesPerStream, R.flat(), R.countBy(R.identity()));

  return R.pipe(frequency, R.entries(), R.sortBy([R.prop(1), 'desc']));
})();

const collabCount = (() => {
  const collabsPerStream = R.pipe(
    streams,
    R.map(R.map((vod) => collabs[vod.video_id])),
    R.map(R.flat()),
    R.map(R.map(R.prop('collab'))),
    R.map(R.unique())
  );

  const frequency = R.pipe(collabsPerStream, R.flat(), R.countBy(R.identity()));

  return R.pipe(frequency, R.entries(), R.sortBy([R.prop(1), 'desc']));
})();

const gameLengths = (() => {
  return R.pipe(
    games,
    R.groupByProp('game'),
    R.mapValues(R.sumBy(R.prop('duration'))),
    R.entries(),
    R.sortBy([R.prop(1), 'desc'])
  );
})();

const firstTimeChatter = {
  success: R.sumBy(vods, (v) => v.succ_ftc_count),
  total: R.sumBy(vods, (v) => v.ftc_count),
};

const storyCount = (() => {
  const storiesPerStream = R.pipe(
    streams,
    R.map(R.map((vod) => stories[vod.video_id])),
    R.map(R.flat()),
    R.map(R.map(R.prop('story'))),
    R.map(R.unique())
  );

  const frequency = R.pipe(storiesPerStream, R.flat(), R.countBy(R.identity()));

  return R.pipe(frequency, R.entries(), R.sortBy([R.prop(1), 'desc']));
})();

const total_yok = R.sumBy(vods, (v) => v.yok);

// Assert for Dan Clancy Section
(() => {
  const stream = streams.filter((stream) => {
    if (stream.length !== 1) return false;

    const ctgs = categories[stream[0].video_id];

    return ctgs?.length == 1 && ctgs[0].category === 'waffling';
  });

  if (
    stream.length !== 1 ||
    stream[0]?.length !== 1 ||
    stream[0][0].title !== 'Atrioc Exposes The TRUTH About Dan Clancy'
  ) {
    throw new Error("Dan Clancy Power Hour wasn't the only pure waffling stream");
  }
})();

const stats = {
  total_streams,
  weekdayDist,

  longest_streams,

  categoryDist,

  total_nose_blow,
  total_ac_adjust,

  total_joeler,

  total_gss_reacts,
  contentCount,

  notableCount,

  collabCount,

  gameLengths,

  firstTimeChatter,

  storyCount,

  total_yok,
} as const;

export type Stats = typeof stats;

fs.writeFileSync('src/lib/assets/stats.json', JSON.stringify(stats, null, 2));
