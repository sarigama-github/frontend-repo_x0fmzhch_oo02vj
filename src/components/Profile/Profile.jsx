import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Crown, Skiing, Map, Settings, Share2, CalendarDays, Snowflake, Mountain, Wallet, BarChart3, Heart, Edit3, ExternalLink, CheckCircle2, Shield } from "lucide-react";
import { Card, SectionTitle, Button, Avatar } from "../Dashboard/Primitives";

const Tag = ({ children, icon: Icon }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E3A8A]/5 text-[#1E3A8A] border border-[#1E3A8A]/10 px-3 py-1 text-xs font-medium">
    {Icon && <Icon className="w-3.5 h-3.5" />} {children}
  </span>
);

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-3 text-gray-600">
      <Icon className="w-4 h-4 text-gray-400" />
      <span className="text-sm">{label}</span>
    </div>
    <span className="text-sm font-medium text-gray-900">{value}</span>
  </div>
);

function SavedScenario({ title, subtitle, to, badge }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-900 mb-1">{title}</div>
          <div className="text-xs text-gray-500">{subtitle}</div>
        </div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs px-2 py-1">{badge}</span>
          )}
          <Link to={to} className="inline-flex items-center text-[#1E3A8A] gap-1 text-sm font-medium hover:underline">
            Open <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="text-2xl md:text-3xl font-bold text-gray-900 font-['Inter']">
              Your Profile
            </motion.h1>
            <p className="text-sm text-gray-600 mt-1">Peak Performance. Precision Decisions.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="h-10"><Share2 className="w-4 h-4 mr-2" /> Share</Button>
            <Button className="h-10"><Edit3 className="w-4 h-4 mr-2" /> Edit Profile</Button>
          </div>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Account Card */}
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-start gap-5">
              <Avatar initials="JK" />
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Jordan Keller</div>
                    <div className="text-sm text-gray-500">Advanced • All-Mountain</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 px-2.5 py-1 text-xs font-semibold">
                      <Crown className="w-3.5 h-3.5" /> Pro Tier
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#60A5FA]/10 text-[#1E3A8A] border border-[#60A5FA]/20 px-2.5 py-1 text-xs font-medium">
                      <Mountain className="w-3.5 h-3.5" /> Ikon Pass
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <SectionTitle title="Account" />
                    <div className="divide-y divide-gray-100">
                      <InfoRow icon={User} label="Username" value="jordank" />
                      <InfoRow icon={Mail} label="Email" value="jordan@peakcision.com" />
                      <InfoRow icon={CalendarDays} label="Member since" value="Nov 2023" />
                    </div>
                  </div>
                  <div>
                    <SectionTitle title="Preferences" />
                    <div className="flex flex-wrap gap-2">
                      <Tag icon={Skiing}>Advanced</Tag>
                      <Tag icon={Snowflake}>Powder Bias: 70%</Tag>
                      <Tag icon={Map}>West • 2-5 hr drive</Tag>
                    </div>
                    <div className="mt-4">
                      <div className="text-xs text-gray-500 mb-1">Most skied terrain</div>
                      <div className="flex gap-2">
                        {['Trees','Bowls','Groomers'].map((t) => (
                          <span key={t} className="px-3 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200 text-xs">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Season Activity */}
          <Card className="p-6">
            <SectionTitle title="Season Activity" />
            <div className="text-sm text-gray-600">Days planned: <span className="font-semibold text-gray-900">18</span></div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-gray-500">This Season</div>
                <div className="text-xl font-bold text-gray-900">12 days</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Vertical</div>
                <div className="text-xl font-bold text-gray-900">78k ft</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Best Resort</div>
                <div className="text-xl font-bold text-gray-900">Snowbird</div>
              </div>
            </div>
            <div className="mt-5 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#1E3A8A]" style={{ width: "65%" }}></div>
            </div>
          </Card>
        </div>

        {/* Saved & Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <SectionTitle title="Saved Calculators & Plans" action={<Link to="/roi" className="text-sm text-[#1E3A8A] hover:underline">New ROI Scenario</Link>} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SavedScenario title="Buy vs Rent: 20 days/season" subtitle="NPV advantage $428 • Breakeven season 2" to="/roi" badge="Buy recommended" />
                <SavedScenario title="Family trip budget" subtitle="3 travelers • 4 days • Mid-March" to="/resorts" />
                <SavedScenario title="Quiver builder" subtitle="Powder + All-Mountain setup" to="/equipment" />
                <SavedScenario title="Ikon West roadtrip" subtitle="7 resorts • 10 days • $1.9k" to="/resorts" />
              </div>
            </Card>

            <Card className="p-6">
              <SectionTitle title="Recommendations for You" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 hover:shadow-md">
                  <div className="text-sm font-semibold text-gray-900 mb-1">Alta Powder Day</div>
                  <div className="text-xs text-gray-500 mb-3">Crowd tolerance matched • +10" forecast</div>
                  <Button variant="secondary" className="w-full h-10"><Map className="w-4 h-4 mr-2"/>View details</Button>
                </Card>
                <Card className="p-4 hover:shadow-md">
                  <div className="text-sm font-semibold text-gray-900 mb-1">Upgrade: Boots Fit</div>
                  <div className="text-xs text-gray-500 mb-3">Improves control • Best value driver</div>
                  <Button variant="secondary" className="w-full h-10"><Wallet className="w-4 h-4 mr-2"/>See options</Button>
                </Card>
                <Card className="p-4 hover:shadow-md">
                  <div className="text-sm font-semibold text-gray-900 mb-1">Technique Clinic</div>
                  <div className="text-xs text-gray-500 mb-3">1:1 lesson • Steeps & trees focus</div>
                  <Button variant="secondary" className="w-full h-10"><BarChart3 className="w-4 h-4 mr-2"/>Book now</Button>
                </Card>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <SectionTitle title="Security & Privacy" />
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-gray-700">Two-factor authentication</span>
                  <span className="ml-auto text-xs text-gray-500">Enabled</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-gray-700">Data sharing with partners</span>
                  <span className="ml-auto text-xs text-gray-500">Limited</span>
                </div>
                <Button variant="secondary" className="w-full h-10 mt-2"><Settings className="w-4 h-4 mr-2"/>Manage settings</Button>
              </div>
            </Card>

            <Card className="p-6">
              <SectionTitle title="Connected Services" />
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-700"><Heart className="w-4 h-4 text-[#FF6B35]"/> Strava</div>
                  <Button variant="ghost" className="h-8">Disconnect</Button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-700"><CalendarDays className="w-4 h-4 text-[#1E3A8A]"/> Apple Calendar</div>
                  <Button variant="ghost" className="h-8">Connect</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="h-16" />
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[min(960px,92%)]">
          <Card className="p-3 border-gray-200/70 backdrop-blur supports-[backdrop-filter]:bg-white/90">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <div className="text-sm text-gray-600">Save updates to your profile and sync recommendations across devices.</div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" className="h-10">Cancel</Button>
                <Button className="h-10">Save Changes</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
